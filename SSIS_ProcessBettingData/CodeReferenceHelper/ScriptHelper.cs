using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Diagnostics;
using System.Data;
using System.Data.Common;
using System.Data.OleDb;
using System.Data.SqlClient;
using System.IO;
using System.Globalization;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
namespace CodeReferenceHelper
{
    public class ScriptHelper
    {
        #region Properties
        public int RowsInserted { get; set; }
        public int RowsDeleted { get; set; }
        public int RowsUpdated { get; set; }
        public int RowsStaged { get; set; }
        public string SuiteFolderLocation { get; set; }
        public string unProcessedFileFullName { get; set; }
        public string InProcessedFileFullName { get; set; }
        public Dictionary<int, ProcessInformation> ProcessControl = new Dictionary<int, ProcessInformation>();
        public int SSISPackagesCount = 0;

        public List<string> ORACLE = new List<string> { "OLEDB_ORACLE", "ODBC_ORACLE" };
        public List<string> SQL = new List<string> { "OLEDB", "ODBC", "OLEDB_SQL", "ODBC_SQL" };

        #endregion
        public void MainStagingExecutionFileBulkUpload(Dictionary<string, object> values)
        {

            //string ConnStr_ETLReference = values["ConnStr_ETLReference"].ToString();
            //string Environment = values["Environment"].ToString();
            string FileNameSeparator = values["FileNameSeparator"].ToString();
            //string StagingPackageName = values["StagingPackageName"].ToString();
            string ConnStr_Staging = values["ConnStr_Staging"].ToString();
            //string SourceQueryMapping = values["SourceQueryMapping"].ToString();
            //char DelimiterChar = Convert.ToChar(values["DelimiterChar"]);
            //string Suite = values["Suite"].ToString();
            string FolderBaseLocation = values["FolderBaseLocation"].ToString();
            string StagingTable = values["StagingTable"].ToString();
            //string MergeQuery = values["MergeQuery"].ToString();
            //bool bHasHeader = Convert.ToBoolean(values["HasHeader"]);
            int BulkUploadLoadSize = Convert.ToInt32(values["BulkUploadLoadSize"]);
            string StartTime = values["StartTime"].ToString();
            string FileTimeStampFormat = values["FileTimeStampFormat"].ToString();
            //int StagingControlID = Convert.ToInt32(values["StagingControlID"]);
            //string ManagerGUID = values["ManagerGUID"].ToString();
            //bool bTruncateStagingTable = Convert.ToBoolean(values["TruncateStagingTable"]);
            // sheet variable to be used Bulk excel file 
            //string Sheet = values["Sheet"].ToString();
            //string FileTimeFormat = values["FileTimeFormat"].ToString();

            SuiteFolderLocation = FolderBaseLocation;

            var dsb = new System.Data.Common.DbConnectionStringBuilder();

            checkConnection(ConnStr_Staging);
            dsb.ConnectionString = ConnStr_Staging;
            dsb.Remove("Provider");
            ConnStr_Staging = dsb.ConnectionString + ";Connect Timeout=0";

            //List<Mapping> Mappings = SplitMappings(SourceQueryMapping);

            var fileFullNames = GetFiles(Path.Combine(SuiteFolderLocation, "Unprocess"));
            //var OrderFiles = GetOrderFiles(fileFullNames, FileNameSeparator, StagingPackageName, FileTimeStampFormat);
            var OrderFiles = GetOrderFiles(fileFullNames, FileNameSeparator, FileTimeStampFormat);
            //if (OrderFiles != null)
            //{
                foreach (var file in OrderFiles)
                {

                    //int StagingJobID = GetStagingJobID(ConnStr_ETLReference);
                    unProcessedFileFullName = file.Value;

                  
                    
                    InProcessedFileFullName = moveFileToInProcess(unProcessedFileFullName, SuiteFolderLocation);



                
                }
           

        }
        public List<string> GetFiles(string suiteFolderLocation)
        {// get more file with extention xlsx
            if (Directory.Exists(suiteFolderLocation))
            {
                var files =
                    Directory.GetFiles(suiteFolderLocation, "*.*")
                        .Where(file => file.ToLower().EndsWith("json")
                                       || file.ToLower().EndsWith("txt"))
                        .ToList();
                return files;
            }
            return null;
        }
        public SortedList<DateTime, String> GetOrderFiles(List<string> fileFullNames, string fileNameSeparator, string fileTimeStampFormat)
        //, string PackageName
        {
            var files = new SortedList<DateTime, String>();
            foreach (var filefullName in fileFullNames)
            {
                
                    string timeStamp = GetTimeStamp(filefullName, fileNameSeparator);

                    CultureInfo provider = CultureInfo.InvariantCulture;
                    DateTime dt = DateTime.ParseExact(timeStamp, fileTimeStampFormat, provider);

                    files.Add(dt, filefullName);
                
            }
            if (files.Count > 0)
            {
                return files;
            }
            return null;
        }
        public string GetTimeStamp(string fileFullName, string fileNameSeparator)
        {
            string fileName = Path.GetFileName(fileFullName);
            int index = fileName.LastIndexOf(fileNameSeparator);
            string timeStamp = fileName.Substring((fileName.LastIndexOf(fileNameSeparator) + 1), (fileName.Length - 1 - index));
            return Path.GetFileNameWithoutExtension(timeStamp);
        }
        public string moveFileToInProcess(string unProcessedFileFullName, string SuiteFolderLocation)
        {
            string InProcessFileFullName = "";
            string InProcessDirectory = Path.Combine(SuiteFolderLocation, "InProcess", Guid.NewGuid().ToString());
           

                InProcessFileFullName = Path.Combine(InProcessDirectory, Path.GetFileName(unProcessedFileFullName));
                Directory.CreateDirectory(InProcessDirectory);
                System.IO.File.Move(unProcessedFileFullName, InProcessFileFullName);
            
            return InProcessFileFullName;
        }
        public string GetFileTimeFormat(string fileFullName, string fileNameSeparator)
        {

            string fileName = Path.GetFileName(fileFullName);

            string FileTimeFormat = fileName.Substring(fileName.LastIndexOf(fileNameSeparator) + 1, 6);
            return FileTimeFormat;
        }
        //public void ProcessFile(string InProcessedFileFullName, string ConnStr_Staging, int BulkUploadLoadSize,
        //  string SuiteFolderLocation)
        ////int StagingJobID, , List<Mapping> Mappings, string StagingExtractTable, , bool HasHeader, string Sheet, string StagingPackageName
        //{
        //    string selectColumns = "";
            
        //    //var listheader = ReadOriginalFileExceHeader(InProcessedFileFullName, Sheet);
        //    //foreach (var column in listheader)
        //    //{
        //    //    selectColumns += column.ToString() + ",";
        //    //}
        //    var FileTimeFormat = GetFileTimeFormat(InProcessedFileFullName, "_");
        //    //var query = "SELECT " + selectColumns + "'" + StagingPackageName + FileTimeFormat + "'AS [Id]," + StagingJobID + " AS StagingJobID FROM [" +
        //    //                Sheet + "_Data$]" + " WHERE [Entity] is not null";

        //    PerformExcelFileBulkCopy(query, ConnStr_Staging, InProcessedFileFullName, BulkUploadLoadSize, StagingExtractTable,
        //        Mappings, HasHeader, Sheet, StagingPackageName);

        //    string archiveFileFullName = Path.Combine(SuiteFolderLocation, "Processed_" + Sheet, Path.GetFileName(InProcessedFileFullName));

        //    if (File.Exists(archiveFileFullName))
        //    {
        //        //TODO: Fix deletion
        //        File.Delete(archiveFileFullName);
        //    }

        //    File.Move(InProcessedFileFullName, archiveFileFullName);
        //    /*copy file to process next sheet data by Minh Tran 20092016 */
        //    if (Sheet != "Intragroup")
        //    {
        //        if (StagingPackageName != "XX_Aggregation")
        //        {
        //            string NextSheetFileFullName = Path.Combine(SuiteFolderLocation, "Unprocessed", Path.GetFileName(archiveFileFullName));
        //            if (File.Exists(NextSheetFileFullName))
        //            {
        //                File.Delete(NextSheetFileFullName);
        //            }
        //            File.Copy(archiveFileFullName, NextSheetFileFullName);
        //        }
        //    }
        //    /*-----------------------------------------------------*/
        //    if (Directory.Exists(Path.GetDirectoryName(InProcessedFileFullName)))
        //    {
        //        Directory.Delete(Path.GetDirectoryName(InProcessedFileFullName), true);
        //    }

        //    // Move zip file into Processed

        //    if (Path.GetExtension(unProcessedFileFullName).ToLower() == ".zip")
        //    {
        //        archiveFileFullName = Path.Combine(SuiteFolderLocation, "Processed", Path.GetFileName(unProcessedFileFullName));

        //        if (File.Exists(archiveFileFullName))
        //        {
        //            File.Delete(archiveFileFullName);
        //        }
        //        File.Move(unProcessedFileFullName, archiveFileFullName);
        //    }
        //}
        public void InsertStaging(string ConnStr_Staging,string TournamentJson, string MatchJson, string ActualFileName,string StartTime
                    //string ExtractStartTime,
                    //string ExtractEndTime,
                    //int StagingControlID,
                    //string ManagerGUID
                    //int StagingJobID,
                    //int SuccessFlag,
                    //int CompletedFlag,
                    //string MessageSource,
                    //int RowsInserted,
                    //int RowsDeleted,
                    //int RowsUpdated,
                    //int RowsStaged,
            )
        {
            //string tempMessage = Message.Replace("'", "''");

            string sqlCmdLog = "[spInsertSTG_SportData] "
                                + "@TournamentJson = '" + TournamentJson + "', "
                                + "@MatchJson = '" + TournamentJson + "', "
                               + "@FileName = '" + ActualFileName + "', "
                               + "@StartTime = '" + StartTime;

           

          

            var dsb = new System.Data.Common.DbConnectionStringBuilder();

            dsb.ConnectionString = ConnStr_Staging;
            dsb.Remove("Provider");
            ConnStr_Staging = dsb.ConnectionString;

            var SrcConn = new SqlConnection(ConnStr_Staging);

            var sCommand = new SqlCommand(sqlCmdLog, SrcConn);
            SrcConn.Open();
            sCommand.ExecuteNonQuery();
            SrcConn.Close();
            SrcConn.Dispose();
        }
        #region JsonProcess
        public static List<string> ReadContentFile(string filename)
        {
            List<string> Line = new List<string>();
            var filestream = File.OpenRead(filename);
            var streamReader = new StreamReader(filestream, Encoding.UTF8, true);
            String str;
            while ((str = streamReader.ReadLine()) != null)
            {
                Line.Add(str);
            }
            return Line;
        }
        public static bool IsJson(string textline)
        {
            textline = textline.Trim();
            if ((textline.StartsWith("{") && textline.EndsWith("}")) || //for  object
                (textline.StartsWith("[") && textline.EndsWith("]"))) //for array
            {

                try
                {
                    var obj = JToken.Parse(textline);
                    return true;
                }
                catch (JsonReaderException jex)
                {
                    //Exception in parsing json
                    Console.WriteLine(jex.Message);
                    return false;
                }
                catch (Exception ex) //some other exception
                {
                    Console.WriteLine(ex.ToString());
                    return false;
                }

            }
            else
            {
                return false;
            }

        }
        public static bool IsJsonObject(string textline)
        {
            textline = textline.Trim();
            if ((textline.StartsWith("{") && textline.EndsWith("}")))//for  object

            {

                try
                {
                    var obj = JObject.Parse(textline);
                    return true;
                }
                catch (JsonReaderException jex)
                {
                    //Exception in parsing json
                    Console.WriteLine(jex.Message);
                    return false;
                }
                catch (Exception ex) //some other exception
                {
                    Console.WriteLine(ex.ToString());
                    return false;
                }

            }
            else
            {
                return false;
            }

        }
        public static bool IsJArray(string textline)
        {
            textline = textline.Trim();
            if ((textline.StartsWith("[") && textline.EndsWith("]"))) //for array
            {

                try
                {
                    var obj = JArray.Parse(textline);
                    return true;
                }
                catch (JsonReaderException jex)
                {
                    //Exception in parsing json
                    Console.WriteLine(jex.Message);
                    return false;
                }
                catch (Exception ex) //some other exception
                {
                    Console.WriteLine(ex.ToString());
                    return false;
                }

            }
            else
            {
                return false;
            }

        }
        public static JObject ConvertToJsonObj(string textline)
        {

            bool str = IsJson(textline);
            if (str == true)
            {
                JObject jsonObj = JObject.Parse(textline);

                return jsonObj;
            }
            else
                return null;

        }
        public static List<string> GetPropertiesJsonObject(JObject jObj)
        {
            List<string> ListKeyJsonObj = new List<string>();
            foreach (var property in jObj.Properties())
            {
                ListKeyJsonObj.Add(property.Name);
            }
            return ListKeyJsonObj;
        }
        public static List<string> GetListKeyJsonArray(JArray Jarr)
        {
            List<string> ListKeyJson = new List<string>();
            foreach (JObject parsedObject in Jarr.Children<JObject>())
            {
                foreach (JProperty parsedProperty in parsedObject.Properties())
                {
                    ListKeyJson.Add(parsedProperty.Name);

                }

            }
            return ListKeyJson;
        }public static Dictionary<string, string> GetAllProperties(JObject parent)
        {

            Dictionary<string, string> listOfProperties = new Dictionary<string, string>();
            GetAllProperties(parent, listOfProperties);
            return listOfProperties;

        }
        private static void GetAllProperties(JObject parent, Dictionary<string, string> listofKey)
        {
            if (parent.Type == JTokenType.Object)
            {
                foreach (JProperty child in parent.Children<JProperty>())
                {
                    listofKey.Add(child.Name.ToString(), child.Value.ToString());
                    if (child.Value.Type == JTokenType.Object)
                    {
                        GetAllProperties(JObject.Parse(child.Value.ToString()), listofKey);
                    }

                }

            }
            else if (parent.Type == JTokenType.Array)
            {
                foreach (JProperty child in parent.Children<JProperty>())
                {
                    listofKey.Add(parent.Path.ToString(), child.Value.ToString());
                    GetAllProperties(JObject.Parse(child.Value.ToString()), listofKey);
                }
            }


        }
        #endregion
        #region Common
        public void checkConnection(string ConnStr, string SourceTypeName = "OLEDB")
                        {
                            var dsb = new DbConnectionStringBuilder();

                            dsb.ConnectionString = ConnStr;
                            dsb.Remove("Provider");
                            if (SQL.Contains(SourceTypeName))
                            {

                                var con = new SqlConnection(dsb.ConnectionString);
                                con.Open();
                                con.Close();
                            }

                        }
                public DataSet GetData(string connnectionString, string sqlQuery)
                {
                    var dsb = new System.Data.Common.DbConnectionStringBuilder();

                    dsb.ConnectionString = connnectionString;
                    dsb.Remove("Provider");

                    var ds = new DataSet();
                    using (var conn = new SqlConnection(dsb.ConnectionString))
                    {
                        conn.Open();
                        SqlCommand cm = new SqlCommand();
                        cm.Connection = conn;
                        cm.CommandText = sqlQuery;
                        cm.CommandTimeout = 0;
                        SqlDataAdapter adapter = new SqlDataAdapter();
                        adapter.SelectCommand = cm;
                        adapter.Fill(ds);
                        conn.Close();
                    }

                    return ds;
                }
                public void TruncateTable(string Table, string ConnStr_Destination, bool bTruncateTable)
                {
                    if (bTruncateTable)
                    {
                        var trcConn = new SqlConnection(ConnStr_Destination);

                        var trcCommand = new SqlCommand("TRUNCATE TABLE " + Table, trcConn);
                        trcCommand.CommandTimeout = 0;

                        trcConn.Open();
                        trcCommand.ExecuteNonQuery();
                        trcConn.Close();
                        trcConn.Dispose();
                    }
                }
                public string GenerateListToString(List<string> list)
                {
                    string str = list.Aggregate(string.Empty, (current, item) => current + (item + ","));
                    if (str.Length > 1)
                    {
                        str = str.Substring(0, str.Length - 1);
                    }

                    return str;
                }
        #endregion
    }
    public class ProcessInformation : Process
    {
        public int ControlID { get; set; }
        public string OutputMessage { get; set; }
    }
}
