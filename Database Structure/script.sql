USE [master]
GO
/****** Object:  Database [BSportTeamDB]    Script Date: 7/1/2017 3:49:14 PM ******/
CREATE DATABASE [BSportTeamDB]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'BSportTeamDB', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.SQLEXPRESS\MSSQL\DATA\Bsportteam' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'BSportTeamDB_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.SQLEXPRESS\MSSQL\DATA\Bsportteam_log' , SIZE = 2816KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [BSportTeamDB] SET COMPATIBILITY_LEVEL = 110
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [BSportTeamDB].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [BSportTeamDB] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [BSportTeamDB] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [BSportTeamDB] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [BSportTeamDB] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [BSportTeamDB] SET ARITHABORT OFF 
GO
ALTER DATABASE [BSportTeamDB] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [BSportTeamDB] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [BSportTeamDB] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [BSportTeamDB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [BSportTeamDB] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [BSportTeamDB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [BSportTeamDB] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [BSportTeamDB] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [BSportTeamDB] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [BSportTeamDB] SET  DISABLE_BROKER 
GO
ALTER DATABASE [BSportTeamDB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [BSportTeamDB] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [BSportTeamDB] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [BSportTeamDB] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [BSportTeamDB] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [BSportTeamDB] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [BSportTeamDB] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [BSportTeamDB] SET RECOVERY FULL 
GO
ALTER DATABASE [BSportTeamDB] SET  MULTI_USER 
GO
ALTER DATABASE [BSportTeamDB] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [BSportTeamDB] SET DB_CHAINING OFF 
GO
ALTER DATABASE [BSportTeamDB] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [BSportTeamDB] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [BSportTeamDB] SET DELAYED_DURABILITY = DISABLED 
GO
USE [BSportTeamDB]
GO
/****** Object:  User [tvminh]    Script Date: 7/1/2017 3:49:14 PM ******/
CREATE USER [tvminh] WITHOUT LOGIN WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  Schema [adm]    Script Date: 7/1/2017 3:49:15 PM ******/
CREATE SCHEMA [adm]
GO
/****** Object:  Schema [Audit]    Script Date: 7/1/2017 3:49:15 PM ******/
CREATE SCHEMA [Audit]
GO
/****** Object:  Schema [mst]    Script Date: 7/1/2017 3:49:15 PM ******/
CREATE SCHEMA [mst]
GO
/****** Object:  UserDefinedFunction [dbo].[fn_Split]    Script Date: 7/1/2017 3:49:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE FUNCTION [dbo].[fn_Split](@String NVARCHAR(MAX), @Delimiter CHAR(1)) RETURNS @Results TABLE (col1 NVARCHAR(MAX)) AS  
BEGIN  
    DECLARE @INDEX INT  
    DECLARE @SLICE NVARCHAR(MAX)  
    -- HAVE TO SET TO 1 SO IT DOESNT EQUAL Z  
    --     ERO FIRST TIME IN LOOP  
    SELECT @INDEX = 1  
    
    IF @String IS NULL RETURN  
    WHILE @INDEX !=0  
  
  
        BEGIN      
            -- GET THE INDEX OF THE FIRST OCCURENCE OF THE SPLIT CHARACTER  
            SELECT @INDEX = CHARINDEX(@Delimiter,@STRING)  
            -- NOW PUSH EVERYTHING TO THE LEFT OF IT INTO THE SLICE VARIABLE  
            IF @INDEX !=0  
                SELECT @SLICE = LEFT(@STRING,@INDEX - 1)  
            ELSE  
                SELECT @SLICE = @STRING  
            -- PUT THE ITEM INTO THE RESULTS SET
			IF(LTRIM(RTRIM(@SLICE)) <>'')
				INSERT INTO @Results(col1) VALUES(LTRIM(RTRIM(@SLICE)))  
            -- CHOP THE ITEM REMOVED OFF THE MAIN STRING  
			SELECT @STRING = RIGHT(@STRING,LEN(REPLACE(@STRING,' ','@')) - @INDEX) 
            -- BREAK OUT IF WE ARE DONE  
            IF LEN(@STRING) = 0 BREAK  
    END  
  
    RETURN  
END  
  








GO
/****** Object:  UserDefinedFunction [dbo].[fnConvertTitleCaseToSpacedString]    Script Date: 7/1/2017 3:49:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

----------------------------------------------------------------------------------------------
-- This function is designed to convert camel case to a spaced string
-- This is used to optionally convert our various element names in metadata to spaced strings on the fly
-- Steve Lawson 20150206
--
----------------------------------------------------------------------------------------------
CREATE FUNCTION [dbo].[fnConvertTitleCaseToSpacedString]
(
       @List                VARCHAR(8000) = NULL
) RETURNS VARCHAR(8000)
AS 
BEGIN

    DECLARE @SplitWords AS TABLE (WordOrder INT, Word VARCHAR(500), WordStart INT, WordEnd INT)
    DECLARE @StringLength AS INT
    DECLARE @Output AS VARCHAR(8000)

    SET @StringLength = DATALENGTH(@List);

    WITH numbers
    AS (
	    SELECT TOP (ISNULL(@StringLength, 0)) n = ROW_NUMBER() OVER (ORDER BY (SELECT NULL))
	    FROM (VALUES (0), (0), (0), (0), (0), (0), (0), (0), (0), (0)) d(n), 
		    (VALUES (0), (0), (0), (0), (0), (0), (0), (0), (0), (0)) e(n), 
		    (VALUES (0), (0), (0), (0), (0), (0), (0), (0), (0), (0)) f(n), 
		    (VALUES (0), (0), (0), (0), (0), (0), (0), (0), (0), (0)) g(n)
	    )

    INSERT INTO @SplitWords
    SELECT 
	   Grouper AS WordOrder, 
	   SUBSTRING(@List, MAX(CASE WHEN MATCHED = 1 THEN n ELSE 0 END), MAX(CASE WHEN MATCHED = 0 THEN n ELSE 0 END) - MAX(CASE WHEN MATCHED = 1 THEN n ELSE 0 END) + 1) AS Word, 
	   MAX(CASE WHEN MATCHED = 1 THEN n ELSE 0 END) AS WordStart, 
	   MAX(CASE WHEN MATCHED = 0 THEN n ELSE 0 END) AS WordEnd
    FROM (
	    SELECT 
		  n, 
		  y.[Matched], 
		  Grouper = CASE WHEN MATCHED = 1 THEN ROW_NUMBER() OVER (ORDER BY y.[Matched] DESC, n) ELSE n - ROW_NUMBER() OVER (ORDER BY y.[Matched], n) END
	    FROM numbers
	    CROSS APPLY (
		    SELECT [Matched] = 
			 CASE 
				WHEN SUBSTRING(@List COLLATE SQL_Latin1_General_CP1_CS_AS, n, 1) LIKE '[ABCDEFGHIJKLMNOPQRSTUVWXYZ]' 
				AND NOT 
				    (SUBSTRING(@List COLLATE SQL_Latin1_General_CP1_CS_AS, n - 1, 1) LIKE '[ABCDEFGHIJKLMNOPQRSTUVWXYZ]' 
				    AND 
					   (SUBSTRING(@List COLLATE SQL_Latin1_General_CP1_CS_AS, n + 1, 1) LIKE '[ABCDEFGHIJKLMNOPQRSTUVWXYZ]' 
					   OR n = LEN(@List))
					) THEN 1 
				ELSE 0 
			END
		    ) y
	    ) t
    GROUP BY Grouper

    SET @Output = SUBSTRING((
			    SELECT ' ' + t.Word
			    FROM @SplitWords t
			    ORDER BY t.WordOrder
			    FOR XML PATH('')
			    ), 2, 200000)

    RETURN @Output

END






GO
/****** Object:  UserDefinedFunction [dbo].[fnGetParameterValue]    Script Date: 7/1/2017 3:49:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Stephen Lawson
-- Create date: 2013-09-04
-- Description:	Returns the ParameterValue for a given ParameterName
-- =============================================
CREATE FUNCTION [dbo].[fnGetParameterValue] 
(
	-- Add the parameters for the function here
	@ParameterName VARCHAR(40),
	@BuildTags AS VARCHAR(500)
)
RETURNS VARCHAR(4000)
AS
BEGIN
	-- Declare the return variable here
	DECLARE @ParameterValue VARCHAR(4000)

	-- Add the T-SQL statements to compute the return value here
	SELECT @ParameterValue = (SELECT ParameterValue 
								FROM dbo.Parameter 
								WHERE ParameterName = @ParameterName
									  AND @BuildTags IN (select col1 from dbo.fn_Split(BuildTags,',')) )

	-- Return the result of the function
	RETURN @ParameterValue

END








GO
/****** Object:  UserDefinedFunction [dbo].[fnValidateIdentifier]    Script Date: 7/1/2017 3:49:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE FUNCTION [dbo].[fnValidateIdentifier](@Identifier VARCHAR(254), @IncludeInBuild BIT)
RETURNS @retInfo TABLE 
(
    -- Columns returned by the function
     ViolatedRule INT,
     Severity VARCHAR(40),
	ViolatedDescription VARCHAR(200),
	Mitigation VARCHAR(250)

	/*
	Creator			: Ba Nguyen
	Created Date	: Jul 21, 2014

	Rule 0: NULL or EMPTY not allowed
	Rule 1: Lengh of string less than 128
	Rule 2: First character must be a letter
	Rule 3: Embedded spaces not allowed
	Rule 4: Do not use reserved words

	This function will check an identifier valid or invalid. 
	Return : 0 is valid
	Return : <> 0 is invalid
	*/
)

AS 
-- Returns the first name, last name, job title, and contact type for the specified contact.
BEGIN
    DECLARE 

			@Rule0 INT = 1,
			@Severity0 VARCHAR(40), 
			@Rule0Desc VARCHAR(200) = 'NULL or EMPTY not allowed: [' + @Identifier + ']',
			@Rule0Mitigation VARCHAR(250) = 'replace NULL or EMPTY values by another one',

			@Rule1 INT = 2,
			@Severity1 VARCHAR(40), 
			@Rule1Desc VARCHAR(200) = 'Lengh of string less than 128: [' + @Identifier + ']',
			@Rule1Mitigation VARCHAR(250) = 'make your string less than 128 characters',

			@Rule2 INT = 3,
			@Severity2 VARCHAR(40), 
			@Rule2Desc VARCHAR(200) = 'First character must be a letter: [' + @Identifier + ']',
			@Rule2Mitigation VARCHAR(250) ='replace the first character by a letter',

			@Rule3 INT = 4,
			@Severity3 VARCHAR(40), 
			@Rule3Desc VARCHAR(200) = 'Embedded spaces not allowed: [' + @Identifier + ']',
			@Rule3Mitigation VARCHAR(250) = 'remove all spaces from your string',

			@Rule4 INT = 5,
			@Severity4 VARCHAR(40), 
			@Rule4Desc VARCHAR(200) = 'Do not use reserved words: [' + @Identifier + ']',
			@Rule4Mitigation VARCHAR(250) = 'replace reserved words by none-reserved words'
	
	--Rule 0: NULL or EMPTY not allowed
	IF(@Identifier IS NULL OR @Identifier = '')
	BEGIN
	     SET @Severity0 = (CASE WHEN @IncludeInBuild = 1 THEN 'Error' ELSE 'Warning' END)
		INSERT INTO @retInfo(ViolatedRule,Severity,ViolatedDescription,Mitigation) VALUES (@Rule0,@Severity0,@Rule0Desc,@Rule0Mitigation)
	END

	--Rule 1: Lengh less than 128
	IF LEN(@Identifier) >128 
	BEGIN 
	     SET @Severity1 = (CASE WHEN @IncludeInBuild = 1 THEN 'Error' ELSE 'Warning' END)
		INSERT INTO @retInfo(ViolatedRule,Severity,ViolatedDescription,Mitigation) VALUES (@Rule1,@Severity1,@Rule1Desc,@Rule1Mitigation)
	END
	
	--Rule 2: The first character must be a letter
	IF LEFT(@Identifier,1) NOT like '[a-Z]' 
	BEGIN
	     SET @Severity2 = (CASE WHEN @IncludeInBuild = 1 THEN 'Error' ELSE 'Warning' END)
		INSERT INTO @retInfo(ViolatedRule,Severity,ViolatedDescription,Mitigation) VALUES (@Rule2,@Severity2,@Rule2Desc,@Rule2Mitigation)
	END

	--Rule 3: No embedded spaces
	IF CHARINDEX(' ',@Identifier)> 0
	BEGIN
	     SET @Severity3 = (CASE WHEN @IncludeInBuild = 1 THEN 'Error' ELSE 'Warning' END)
		INSERT INTO @retInfo(ViolatedRule,Severity,ViolatedDescription,Mitigation) VALUES (@Rule3,@Severity3,@Rule3Desc,@Rule3Mitigation)
	END
	
	--Rule 4: Should not use reserved words
	IF EXISTS (SELECT 1 FROM dbo.KeyWordList WHERE KeyWord  = @Identifier)
	BEGIN
	     SET @Severity4 = 'Warning'
		INSERT INTO @retInfo(ViolatedRule,Severity,ViolatedDescription,Mitigation) VALUES (@Rule4,@Severity4,@Rule4Desc,@Rule4Mitigation)
	END

	RETURN 
END










GO
/****** Object:  Table [adm].[AppFunction]    Script Date: 7/1/2017 3:49:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [adm].[AppFunction](
	[FeatureId] [int] NOT NULL,
	[FeatureName] [varchar](50) NULL,
	[Active] [bit] NULL,
	[CreateTime] [datetime] NULL,
	[CreateBy] [varchar](50) NULL,
	[UpdateTime] [datetime] NULL,
	[UpdateBy] [varchar](50) NULL,
 CONSTRAINT [PK_AppFunction] PRIMARY KEY CLUSTERED 
(
	[FeatureId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [adm].[Roles]    Script Date: 7/1/2017 3:49:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [adm].[Roles](
	[RoleId] [int] NOT NULL,
	[RoleName] [varchar](50) NULL,
	[Active] [bit] NULL,
	[CreateTime] [datetime] NULL,
	[CreateBy] [varchar](50) NULL,
	[UpdateTime] [datetime] NULL,
	[UpdateBy] [varchar](50) NULL,
 CONSTRAINT [PK_Roles] PRIMARY KEY CLUSTERED 
(
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [adm].[UserFunction]    Script Date: 7/1/2017 3:49:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [adm].[UserFunction](
	[UserId] [int] NOT NULL,
	[RoleId] [int] NULL,
	[FeatureId] [int] NULL,
	[Create] [bit] NULL,
	[Update] [bit] NULL,
	[Delete] [bit] NULL,
	[FullControl] [bit] NULL,
	[CreateBy] [varchar](50) NULL,
	[CreateTime] [datetime] NULL,
	[UpdateBy] [varchar](50) NULL,
	[UpdateTime] [datetime] NULL,
	[DeleteFlag] [bit] NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [adm].[Users]    Script Date: 7/1/2017 3:49:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [adm].[Users](
	[UserId] [int] NOT NULL,
	[UserName] [varchar](50) NULL,
	[Active] [bit] NULL,
	[CreateTime] [datetime] NULL,
	[CreateBy] [varchar](50) NULL,
	[UpdateTime] [datetime] NULL,
	[UpdateBy] [varchar](50) NULL,
	[DeleteFlag] [bit] NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [Audit].[Audit_DDL_Events]    Script Date: 7/1/2017 3:49:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Audit].[Audit_DDL_Events](
	[DDL_Event_Time] [datetime] NULL,
	[DDL_Login_Name] [nvarchar](150) NULL,
	[DDL_User_Name] [nvarchar](150) NULL,
	[DDL_Server_Name] [nvarchar](150) NULL,
	[DDL_Database_Name] [nvarchar](150) NULL,
	[DDL_Schema_Name] [nvarchar](150) NULL,
	[DDL_Object_Name] [nvarchar](150) NULL,
	[DDL_Object_Type] [nvarchar](150) NULL,
	[DDL_Command] [nvarchar](max) NULL,
	[DDL_CreateCommand] [nvarchar](max) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [Audit].[AuditData]    Script Date: 7/1/2017 3:49:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [Audit].[AuditData](
	[AuditDataID] [int] IDENTITY(1,1) NOT NULL,
	[Type] [char](1) NULL,
	[TableName] [varchar](128) NULL,
	[PrimaryKeyField] [varchar](1000) NULL,
	[PrimaryKeyValue] [varchar](1000) NULL,
	[FieldName] [varchar](128) NULL,
	[OldValue] [nvarchar](max) NULL,
	[NewValue] [nvarchar](max) NULL,
	[UpdateDate] [datetime] NULL,
	[UserName] [varchar](128) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [Audit].[AuditMonitorTableColumns]    Script Date: 7/1/2017 3:49:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Audit].[AuditMonitorTableColumns](
	[AuditMonitorTableColumnsID] [int] IDENTITY(1,1) NOT NULL,
	[SchemaName] [nvarchar](250) NULL,
	[TableName] [nvarchar](250) NULL,
	[ColumnName] [nvarchar](250) NULL,
 CONSTRAINT [PK_AuditMonitorTableColumns] PRIMARY KEY CLUSTERED 
(
	[AuditMonitorTableColumnsID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [Audit].[ErrorLog]    Script Date: 7/1/2017 3:49:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Audit].[ErrorLog](
	[ErrorLogID] [int] IDENTITY(1,1) NOT NULL,
	[ErrorTime] [datetime] NOT NULL,
	[UserName] [sysname] NOT NULL,
	[ErrorNumber] [int] NOT NULL,
	[ErrorSeverity] [int] NULL,
	[ErrorState] [int] NULL,
	[ErrorProcedure] [nvarchar](126) NULL,
	[ErrorLine] [int] NULL,
	[ErrorMessage] [nvarchar](4000) NOT NULL,
 CONSTRAINT [PK_ErrorLog_ErrorLogID] PRIMARY KEY CLUSTERED 
(
	[ErrorLogID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[__MigrationHistory]    Script Date: 7/1/2017 3:49:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[__MigrationHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ContextKey] [nvarchar](300) NOT NULL,
	[Model] [varbinary](max) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK_dbo.__MigrationHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC,
	[ContextKey] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Account]    Script Date: 7/1/2017 3:49:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Account](
	[AccountId] [int] IDENTITY(1,1) NOT NULL,
	[AccountName] [nvarchar](50) NULL,
	[Address] [nvarchar](1000) NULL,
	[BirthDay] [datetime] NULL,
	[Desc] [nvarchar](max) NULL,
	[ImageURL] [nvarchar](200) NULL,
	[PosPlay] [nvarchar](50) NULL,
	[Expr] [int] NULL,
	[Email] [nvarchar](50) NULL,
	[Mobile] [nvarchar](50) NULL,
	[LastName] [nvarchar](50) NULL,
	[FirstName] [nvarchar](50) NULL,
	[CreateTime] [datetime] NULL CONSTRAINT [DF_Account_CreateTime]  DEFAULT (getdate()),
	[CreateBy] [varchar](50) NULL CONSTRAINT [DF_Account_CreateBy]  DEFAULT (suser_name()),
	[UpdateTime] [datetime] NULL CONSTRAINT [DF_Account_UpdateTime]  DEFAULT (getdate()),
	[UpdateBy] [varchar](50) NULL CONSTRAINT [DF_Account_UpdateBy]  DEFAULT (suser_name()),
	[isUpdate] [bit] NULL,
 CONSTRAINT [PK_Account] PRIMARY KEY CLUSTERED 
(
	[AccountId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[AccountTeamplayer]    Script Date: 7/1/2017 3:49:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AccountTeamplayer](
	[TeamId] [int] NOT NULL,
	[AccountId] [int] NOT NULL,
 CONSTRAINT [PK_AccountTeamplayer] PRIMARY KEY CLUSTERED 
(
	[TeamId] ASC,
	[AccountId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[AspNetRoles]    Script Date: 7/1/2017 3:49:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetRoles](
	[Id] [nvarchar](128) NOT NULL,
	[Name] [nvarchar](256) NOT NULL,
 CONSTRAINT [PK_dbo.AspNetRoles] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[AspNetUserClaims]    Script Date: 7/1/2017 3:49:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserClaims](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [nvarchar](128) NOT NULL,
	[ClaimType] [nvarchar](max) NULL,
	[ClaimValue] [nvarchar](max) NULL,
 CONSTRAINT [PK_dbo.AspNetUserClaims] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[AspNetUserLogins]    Script Date: 7/1/2017 3:49:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserLogins](
	[LoginProvider] [nvarchar](128) NOT NULL,
	[ProviderKey] [nvarchar](128) NOT NULL,
	[UserId] [nvarchar](128) NOT NULL,
 CONSTRAINT [PK_dbo.AspNetUserLogins] PRIMARY KEY CLUSTERED 
(
	[LoginProvider] ASC,
	[ProviderKey] ASC,
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[AspNetUserRoles]    Script Date: 7/1/2017 3:49:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserRoles](
	[UserId] [nvarchar](128) NOT NULL,
	[RoleId] [nvarchar](128) NOT NULL,
 CONSTRAINT [PK_dbo.AspNetUserRoles] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[AspNetUsers]    Script Date: 7/1/2017 3:49:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUsers](
	[Id] [nvarchar](128) NOT NULL,
	[Email] [nvarchar](256) NULL,
	[EmailConfirmed] [bit] NOT NULL,
	[PasswordHash] [nvarchar](max) NULL,
	[SecurityStamp] [nvarchar](max) NULL,
	[PhoneNumber] [nvarchar](max) NULL,
	[PhoneNumberConfirmed] [bit] NOT NULL,
	[TwoFactorEnabled] [bit] NOT NULL,
	[LockoutEndDateUtc] [datetime] NULL,
	[LockoutEnabled] [bit] NOT NULL,
	[AccessFailedCount] [int] NOT NULL,
	[UserName] [nvarchar](256) NOT NULL,
 CONSTRAINT [PK_dbo.AspNetUsers] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Function]    Script Date: 7/1/2017 3:49:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Function](
	[AccountId] [int] NOT NULL,
	[RoleId] [int] NOT NULL,
	[FeatureId] [int] NOT NULL,
	[Create] [bit] NULL,
	[Update] [bit] NULL,
	[Delete] [bit] NULL,
	[FullControl] [bit] NULL,
	[CreateBy] [varchar](50) NULL,
	[CreateTime] [datetime] NULL,
	[UpdateBy] [varchar](50) NULL,
	[UpdateTime] [datetime] NULL,
	[DeleteFlag] [bit] NULL,
 CONSTRAINT [PK_Function] PRIMARY KEY CLUSTERED 
(
	[AccountId] ASC,
	[RoleId] ASC,
	[FeatureId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[FunctionFeature]    Script Date: 7/1/2017 3:49:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[FunctionFeature](
	[FeatureId] [int] NOT NULL,
	[FeatureName] [varchar](50) NULL,
	[Active] [bit] NULL,
	[CreateTime] [datetime] NULL,
	[CreateBy] [varchar](50) NULL,
	[UpdateTime] [datetime] NULL,
	[UpdateBy] [varchar](50) NULL,
 CONSTRAINT [PK_FunctionFeature] PRIMARY KEY CLUSTERED 
(
	[FeatureId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Image]    Script Date: 7/1/2017 3:49:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Image](
	[ImageId] [bigint] NOT NULL,
	[ImagePath] [varchar](max) NULL,
 CONSTRAINT [PK_Image] PRIMARY KEY CLUSTERED 
(
	[ImageId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[PlayerTeam]    Script Date: 7/1/2017 3:49:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[PlayerTeam](
	[AccountId] [int] NOT NULL,
	[TeamId] [int] NOT NULL,
	[RoleId] [int] NOT NULL,
	[CreateBy] [varchar](50) NULL,
	[CreateTime] [datetime] NULL,
	[UpdateBy] [varchar](50) NULL,
	[UpdateTime] [datetime] NULL,
 CONSTRAINT [PK_PlayerTeam_1] PRIMARY KEY CLUSTERED 
(
	[AccountId] ASC,
	[TeamId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Post]    Script Date: 7/1/2017 3:49:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Post](
	[Id] [bigint] NOT NULL,
	[AccountId] [int] NULL,
	[TeamId] [int] NULL,
	[Postcontent] [nvarchar](max) NULL,
	[Createtime] [datetime] NULL,
	[Createby] [varchar](50) NULL,
	[Updatetime] [datetime] NULL,
	[Updateby] [varchar](50) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Queue]    Script Date: 7/1/2017 3:49:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Queue](
	[QueueId] [bigint] NOT NULL,
	[AccountId] [int] NULL,
	[CreateTime] [datetime] NULL,
	[Createby] [nchar](10) NULL,
 CONSTRAINT [PK_Queue] PRIMARY KEY CLUSTERED 
(
	[QueueId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[QueueBooking]    Script Date: 7/1/2017 3:49:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[QueueBooking](
	[TeamId] [nchar](10) NULL,
	[IsConfirm] [bit] NULL,
	[ScheduleId] [int] NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[QueueMailNotification]    Script Date: 7/1/2017 3:49:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[QueueMailNotification](
	[AccountId] [nchar](10) NULL,
	[MailNotificationid] [nchar](10) NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Roles]    Script Date: 7/1/2017 3:49:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Roles](
	[RoleId] [int] NOT NULL,
	[RoleName] [varchar](50) NULL,
	[Active] [bit] NULL,
	[CreateTime] [datetime] NULL,
	[CreateBy] [varchar](50) NULL,
	[UpdateTime] [datetime] NULL,
	[UpdateBy] [varchar](50) NULL,
 CONSTRAINT [PK_RolesAccount] PRIMARY KEY CLUSTERED 
(
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Schedule]    Script Date: 7/1/2017 3:49:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Schedule](
	[DateId] [int] NOT NULL,
	[DateValue] [date] NULL,
 CONSTRAINT [PK_Schedule] PRIMARY KEY CLUSTERED 
(
	[DateId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ScheduleBook]    Script Date: 7/1/2017 3:49:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[ScheduleBook](
	[ScheduleBookId] [int] NOT NULL,
	[DateId] [int] NULL,
	[TimeId] [int] NULL,
	[Team1] [int] NULL,
	[Team2] [int] NULL,
	[StadiumId] [int] NULL,
	[HostId] [int] NULL,
	[Active] [bit] NULL,
	[CreateBy] [varchar](50) NULL,
	[CreateTime] [datetime] NULL,
	[UpdateBy] [varchar](50) NULL,
	[UpdateTime] [datetime] NULL,
 CONSTRAINT [PK_ScheduleBook] PRIMARY KEY CLUSTERED 
(
	[ScheduleBookId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[TeamSport]    Script Date: 7/1/2017 3:49:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[TeamSport](
	[TeamId] [int] NOT NULL,
	[TeamName] [nchar](10) NULL,
	[OwnerId] [int] NULL,
	[Description] [nvarchar](1000) NULL,
	[Image_url] [nvarchar](1000) NULL,
	[SportId] [int] NULL,
	[CreateTime] [datetime] NULL CONSTRAINT [DF_TeamSport_CreateTime]  DEFAULT (getdate()),
	[CreateBy] [varchar](50) NULL CONSTRAINT [DF_TeamSport_CreateBy]  DEFAULT (suser_name()),
	[UpdateTime] [datetime] NULL CONSTRAINT [DF_TeamSport_UpdateTime]  DEFAULT (getdate()),
	[UpdateBy] [varchar](50) NULL CONSTRAINT [DF_TeamSport_UpdateBy]  DEFAULT (suser_name()),
 CONSTRAINT [PK_TeamSport] PRIMARY KEY CLUSTERED 
(
	[TeamId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Time]    Script Date: 7/1/2017 3:49:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Time](
	[TimeId] [int] NOT NULL,
	[time] [time](1) NULL,
 CONSTRAINT [PK_Time] PRIMARY KEY CLUSTERED 
(
	[TimeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [mst].[City]    Script Date: 7/1/2017 3:49:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [mst].[City](
	[CityId] [int] NOT NULL,
	[Name] [varchar](50) NULL,
	[Address] [nvarchar](1000) NULL,
	[Active] [bit] NULL,
	[CreateTime] [datetime] NULL,
	[CreateBy] [varchar](50) NULL,
	[UpdateTime] [datetime] NULL,
	[UpdateBy] [varchar](50) NULL,
	[DeleteFlag] [bit] NULL,
 CONSTRAINT [PK_City] PRIMARY KEY CLUSTERED 
(
	[CityId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [mst].[Country]    Script Date: 7/1/2017 3:49:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [mst].[Country](
	[CountryId] [int] NOT NULL,
	[Name] [varchar](50) NULL,
	[Active] [bit] NULL,
	[CreateTime] [datetime] NULL,
	[CreateBy] [varchar](50) NULL,
	[UpdateTime] [datetime] NULL,
	[UpdateBy] [varchar](50) NULL,
	[DeleteFlag] [bit] NULL,
 CONSTRAINT [PK_Country] PRIMARY KEY CLUSTERED 
(
	[CountryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [mst].[Sport]    Script Date: 7/1/2017 3:49:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [mst].[Sport](
	[Id] [int] NOT NULL,
	[SportName] [varchar](50) NULL,
	[CountryId] [nvarchar](1000) NULL,
	[Active] [bit] NULL,
	[CreateTime] [datetime] NULL,
	[CreateBy] [varchar](50) NULL,
	[UpdateTime] [datetime] NULL,
	[UpdateBy] [varchar](50) NULL,
	[DeleteFlag] [bit] NULL,
	[Maximum] [int] NULL,
	[Minimum] [int] NULL,
 CONSTRAINT [PK_Sport] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [mst].[Stadium]    Script Date: 7/1/2017 3:49:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [mst].[Stadium](
	[StadiumId] [int] NOT NULL,
	[StadiumName] [nvarchar](50) NULL,
	[Address] [nvarchar](max) NULL,
	[Phone] [nvarchar](50) NULL,
	[ImageId] [int] NULL,
	[HostId] [int] NOT NULL,
	[Status] [char](1) NULL,
	[CreateTime] [datetime] NULL,
	[CreateBy] [varchar](50) NULL,
	[UpdateTime] [datetime] NULL,
	[UpdateBy] [varchar](50) NULL,
 CONSTRAINT [PK_Stadium_1] PRIMARY KEY CLUSTERED 
(
	[StadiumId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [mst].[Stadium_Schedule]    Script Date: 7/1/2017 3:49:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [mst].[Stadium_Schedule](
	[Stadium_ValueId] [int] NOT NULL,
	[Time] [int] NOT NULL,
	[Status] [char](1) NOT NULL,
	[CreateTime] [datetime] NULL,
	[CreateBy] [varchar](50) NULL,
	[UpdateTime] [datetime] NULL,
	[UpdateBy] [varchar](50) NULL,
 CONSTRAINT [PK_Stadium_Schedule_1] PRIMARY KEY CLUSTERED 
(
	[Time] ASC,
	[Stadium_ValueId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [mst].[Stadium_Value]    Script Date: 7/1/2017 3:49:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [mst].[Stadium_Value](
	[StadiumId] [int] NOT NULL,
	[Stadium_ValueId] [int] NOT NULL,
	[Status] [bit] NOT NULL,
	[CreateTime] [datetime] NULL,
	[CreateBy] [varchar](50) NULL,
	[UpdateTime] [datetime] NULL,
	[UpdateBy] [varchar](50) NULL,
 CONSTRAINT [PK_Stadium_Value_1] PRIMARY KEY CLUSTERED 
(
	[StadiumId] ASC,
	[Stadium_ValueId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
SET ANSI_PADDING ON

GO
/****** Object:  Index [RoleNameIndex]    Script Date: 7/1/2017 3:49:15 PM ******/
CREATE UNIQUE NONCLUSTERED INDEX [RoleNameIndex] ON [dbo].[AspNetRoles]
(
	[Name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON

GO
/****** Object:  Index [IX_UserId]    Script Date: 7/1/2017 3:49:15 PM ******/
CREATE NONCLUSTERED INDEX [IX_UserId] ON [dbo].[AspNetUserClaims]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON

GO
/****** Object:  Index [IX_UserId]    Script Date: 7/1/2017 3:49:15 PM ******/
CREATE NONCLUSTERED INDEX [IX_UserId] ON [dbo].[AspNetUserLogins]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON

GO
/****** Object:  Index [IX_RoleId]    Script Date: 7/1/2017 3:49:15 PM ******/
CREATE NONCLUSTERED INDEX [IX_RoleId] ON [dbo].[AspNetUserRoles]
(
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON

GO
/****** Object:  Index [IX_UserId]    Script Date: 7/1/2017 3:49:15 PM ******/
CREATE NONCLUSTERED INDEX [IX_UserId] ON [dbo].[AspNetUserRoles]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON

GO
/****** Object:  Index [UserNameIndex]    Script Date: 7/1/2017 3:49:15 PM ******/
CREATE UNIQUE NONCLUSTERED INDEX [UserNameIndex] ON [dbo].[AspNetUsers]
(
	[UserName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [adm].[AppFunction] ADD  CONSTRAINT [DF_AppFunction_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [adm].[AppFunction] ADD  CONSTRAINT [DF_AppFunction_CreateBy]  DEFAULT (suser_name()) FOR [CreateBy]
GO
ALTER TABLE [adm].[AppFunction] ADD  CONSTRAINT [DF_AppFunction_UpdateTime]  DEFAULT (getdate()) FOR [UpdateTime]
GO
ALTER TABLE [adm].[AppFunction] ADD  CONSTRAINT [DF_AppFunction_UpdateBy]  DEFAULT (suser_name()) FOR [UpdateBy]
GO
ALTER TABLE [adm].[Roles] ADD  CONSTRAINT [DF_Roles_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [adm].[Roles] ADD  CONSTRAINT [DF_Roles_CreateBy]  DEFAULT (suser_name()) FOR [CreateBy]
GO
ALTER TABLE [adm].[Roles] ADD  CONSTRAINT [DF_Roles_UpdateTime]  DEFAULT (getdate()) FOR [UpdateTime]
GO
ALTER TABLE [adm].[Roles] ADD  CONSTRAINT [DF_Roles_UpdateBy]  DEFAULT (suser_name()) FOR [UpdateBy]
GO
ALTER TABLE [adm].[UserFunction] ADD  CONSTRAINT [DF_UserFunction_CreateBy]  DEFAULT (suser_name()) FOR [CreateBy]
GO
ALTER TABLE [adm].[UserFunction] ADD  CONSTRAINT [DF_UserFunction_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [adm].[UserFunction] ADD  CONSTRAINT [DF_UserFunction_UpdateBy]  DEFAULT (suser_name()) FOR [UpdateBy]
GO
ALTER TABLE [adm].[UserFunction] ADD  CONSTRAINT [DF_UserFunction_UpdateTime]  DEFAULT (getdate()) FOR [UpdateTime]
GO
ALTER TABLE [adm].[UserFunction] ADD  CONSTRAINT [DF_UserFunction_DeleteFlag]  DEFAULT ((0)) FOR [DeleteFlag]
GO
ALTER TABLE [adm].[Users] ADD  CONSTRAINT [DF_Users_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [adm].[Users] ADD  CONSTRAINT [DF_Users_CreateBy]  DEFAULT (suser_name()) FOR [CreateBy]
GO
ALTER TABLE [adm].[Users] ADD  CONSTRAINT [DF_Users_UpdateTime]  DEFAULT (getdate()) FOR [UpdateTime]
GO
ALTER TABLE [adm].[Users] ADD  CONSTRAINT [DF_Users_UpdateBy]  DEFAULT (suser_name()) FOR [UpdateBy]
GO
ALTER TABLE [adm].[Users] ADD  CONSTRAINT [DF_Users_DeleteFlag]  DEFAULT ((0)) FOR [DeleteFlag]
GO
ALTER TABLE [Audit].[AuditData] ADD  CONSTRAINT [DF__AuditData__Updat__4BCC3ABA]  DEFAULT (getdate()) FOR [UpdateDate]
GO
ALTER TABLE [Audit].[ErrorLog] ADD  CONSTRAINT [DF_ErrorLog_ErrorTime]  DEFAULT (getdate()) FOR [ErrorTime]
GO
ALTER TABLE [dbo].[Function] ADD  CONSTRAINT [DF_Function_CreateBy]  DEFAULT (suser_name()) FOR [CreateBy]
GO
ALTER TABLE [dbo].[Function] ADD  CONSTRAINT [DF_Function_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[Function] ADD  CONSTRAINT [DF_Function_UpdateBy]  DEFAULT (suser_name()) FOR [UpdateBy]
GO
ALTER TABLE [dbo].[Function] ADD  CONSTRAINT [DF_Function_UpdateTime]  DEFAULT (getdate()) FOR [UpdateTime]
GO
ALTER TABLE [dbo].[Function] ADD  CONSTRAINT [DF_Function_DeleteFlag]  DEFAULT ((0)) FOR [DeleteFlag]
GO
ALTER TABLE [dbo].[FunctionFeature] ADD  CONSTRAINT [DF_FunctionFeature_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[FunctionFeature] ADD  CONSTRAINT [DF_FunctionFeature_CreateBy]  DEFAULT (suser_name()) FOR [CreateBy]
GO
ALTER TABLE [dbo].[FunctionFeature] ADD  CONSTRAINT [DF_FunctionFeature_UpdateTime]  DEFAULT (getdate()) FOR [UpdateTime]
GO
ALTER TABLE [dbo].[FunctionFeature] ADD  CONSTRAINT [DF_FunctionFeature_UpdateBy]  DEFAULT (suser_name()) FOR [UpdateBy]
GO
ALTER TABLE [dbo].[PlayerTeam] ADD  CONSTRAINT [DF_PlayerTeam_CreateBy]  DEFAULT (suser_name()) FOR [CreateBy]
GO
ALTER TABLE [dbo].[PlayerTeam] ADD  CONSTRAINT [DF_PlayerTeam_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[PlayerTeam] ADD  CONSTRAINT [DF_PlayerTeam_UpdateBy]  DEFAULT (suser_name()) FOR [UpdateBy]
GO
ALTER TABLE [dbo].[PlayerTeam] ADD  CONSTRAINT [DF_PlayerTeam_UpdateTime]  DEFAULT (getdate()) FOR [UpdateTime]
GO
ALTER TABLE [dbo].[Roles] ADD  CONSTRAINT [DF_RolesAccount_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[Roles] ADD  CONSTRAINT [DF_RolesAccount_CreateBy]  DEFAULT (suser_name()) FOR [CreateBy]
GO
ALTER TABLE [dbo].[Roles] ADD  CONSTRAINT [DF_RolesAccount_UpdateTime]  DEFAULT (getdate()) FOR [UpdateTime]
GO
ALTER TABLE [dbo].[Roles] ADD  CONSTRAINT [DF_RolesAccount_UpdateBy]  DEFAULT (suser_name()) FOR [UpdateBy]
GO
ALTER TABLE [dbo].[ScheduleBook] ADD  CONSTRAINT [DF_ScheduleBook_CreateBy]  DEFAULT (suser_name()) FOR [CreateBy]
GO
ALTER TABLE [dbo].[ScheduleBook] ADD  CONSTRAINT [DF_ScheduleBook_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[ScheduleBook] ADD  CONSTRAINT [DF_ScheduleBook_UpdateBy]  DEFAULT (suser_name()) FOR [UpdateBy]
GO
ALTER TABLE [dbo].[ScheduleBook] ADD  CONSTRAINT [DF_ScheduleBook_UpdateTime]  DEFAULT (getdate()) FOR [UpdateTime]
GO
ALTER TABLE [mst].[City] ADD  CONSTRAINT [DF_City_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [mst].[City] ADD  CONSTRAINT [DF_City_CreateBy]  DEFAULT (suser_name()) FOR [CreateBy]
GO
ALTER TABLE [mst].[City] ADD  CONSTRAINT [DF_City_UpdateTime]  DEFAULT (getdate()) FOR [UpdateTime]
GO
ALTER TABLE [mst].[City] ADD  CONSTRAINT [DF_City_UpdateBy]  DEFAULT (suser_name()) FOR [UpdateBy]
GO
ALTER TABLE [mst].[City] ADD  CONSTRAINT [DF_City_DeleteFlag]  DEFAULT ((0)) FOR [DeleteFlag]
GO
ALTER TABLE [mst].[Country] ADD  CONSTRAINT [DF_Country_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [mst].[Country] ADD  CONSTRAINT [DF_Country_CreateBy]  DEFAULT (suser_name()) FOR [CreateBy]
GO
ALTER TABLE [mst].[Country] ADD  CONSTRAINT [DF_Country_UpdateTime]  DEFAULT (getdate()) FOR [UpdateTime]
GO
ALTER TABLE [mst].[Country] ADD  CONSTRAINT [DF_Country_UpdateBy]  DEFAULT (suser_name()) FOR [UpdateBy]
GO
ALTER TABLE [mst].[Sport] ADD  CONSTRAINT [DF_Sport_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [mst].[Sport] ADD  CONSTRAINT [DF_Sport_CreateBy]  DEFAULT (suser_name()) FOR [CreateBy]
GO
ALTER TABLE [mst].[Sport] ADD  CONSTRAINT [DF_Sport_UpdateTime]  DEFAULT (getdate()) FOR [UpdateTime]
GO
ALTER TABLE [mst].[Sport] ADD  CONSTRAINT [DF_Sport_UpdateBy]  DEFAULT (suser_name()) FOR [UpdateBy]
GO
ALTER TABLE [mst].[Stadium] ADD  CONSTRAINT [DF_Stadium_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [mst].[Stadium] ADD  CONSTRAINT [DF_Stadium_CreateBy]  DEFAULT (suser_name()) FOR [CreateBy]
GO
ALTER TABLE [mst].[Stadium] ADD  CONSTRAINT [DF_Stadium_UpdateTime]  DEFAULT (getdate()) FOR [UpdateTime]
GO
ALTER TABLE [mst].[Stadium] ADD  CONSTRAINT [DF_Stadium_UpdateBy]  DEFAULT (suser_name()) FOR [UpdateBy]
GO
ALTER TABLE [mst].[Stadium_Schedule] ADD  CONSTRAINT [DF_Stadium_Schedule_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [mst].[Stadium_Schedule] ADD  CONSTRAINT [DF_Stadium_Schedule_CreateBy]  DEFAULT (suser_name()) FOR [CreateBy]
GO
ALTER TABLE [mst].[Stadium_Schedule] ADD  CONSTRAINT [DF_Stadium_Schedule_UpdateTime]  DEFAULT (getdate()) FOR [UpdateTime]
GO
ALTER TABLE [mst].[Stadium_Schedule] ADD  CONSTRAINT [DF_Stadium_Schedule_UpdateBy]  DEFAULT (suser_name()) FOR [UpdateBy]
GO
ALTER TABLE [mst].[Stadium_Value] ADD  CONSTRAINT [DF_Stadium_Value_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [mst].[Stadium_Value] ADD  CONSTRAINT [DF_Stadium_Value_CreateBy]  DEFAULT (suser_name()) FOR [CreateBy]
GO
ALTER TABLE [mst].[Stadium_Value] ADD  CONSTRAINT [DF_Stadium_Value_UpdateTime]  DEFAULT (getdate()) FOR [UpdateTime]
GO
ALTER TABLE [mst].[Stadium_Value] ADD  CONSTRAINT [DF_Stadium_Value_UpdateBy]  DEFAULT (suser_name()) FOR [UpdateBy]
GO
ALTER TABLE [dbo].[AspNetUserClaims]  WITH CHECK ADD  CONSTRAINT [FK_dbo.AspNetUserClaims_dbo.AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserClaims] CHECK CONSTRAINT [FK_dbo.AspNetUserClaims_dbo.AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserLogins]  WITH CHECK ADD  CONSTRAINT [FK_dbo.AspNetUserLogins_dbo.AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserLogins] CHECK CONSTRAINT [FK_dbo.AspNetUserLogins_dbo.AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserRoles]  WITH CHECK ADD  CONSTRAINT [FK_dbo.AspNetUserRoles_dbo.AspNetRoles_RoleId] FOREIGN KEY([RoleId])
REFERENCES [dbo].[AspNetRoles] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserRoles] CHECK CONSTRAINT [FK_dbo.AspNetUserRoles_dbo.AspNetRoles_RoleId]
GO
ALTER TABLE [dbo].[AspNetUserRoles]  WITH CHECK ADD  CONSTRAINT [FK_dbo.AspNetUserRoles_dbo.AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserRoles] CHECK CONSTRAINT [FK_dbo.AspNetUserRoles_dbo.AspNetUsers_UserId]
GO
/****** Object:  StoredProcedure [dbo].[uspLogError]    Script Date: 7/1/2017 3:49:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- uspLogError logs error information in the ErrorLog table about the 
-- error that caused execution to jump to the CATCH block of a 
-- TRY...CATCH construct. This should be executed from within the scope 
-- of a CATCH block otherwise it will return without inserting error 
-- information. 
CREATE PROCEDURE [dbo].[uspLogError] 
(@ErrorMessage NVARCHAR(4000),
				@ErrorNumber INT,
				@ErrorSeverity INT,
				@ErrorState INT,
				@ErrorLine INT,
				@ErrorProcedure NVARCHAR(200)
  
    ) -- contains the ErrorLogID of the row inserted
AS                               -- by uspLogError in the ErrorLog table
BEGIN
    SET NOCOUNT ON;

    -- Output parameter value of 0 indicates that error 
    -- information was not logged
    DECLARE @ErrorLogID int
    SET @ErrorLogID = 0;

    BEGIN TRY
        -- Return if there is no error information to log
        IF ERROR_NUMBER() IS NULL
            RETURN;

        -- Return if inside an uncommittable transaction.
        -- Data insertion/modification is not allowed when 
        -- a transaction is in an uncommittable state.
        IF XACT_STATE() = -1
        BEGIN
            PRINT 'Cannot log error since the current transaction is in an uncommittable state. ' 
                + 'Rollback the transaction before executing uspLogError in order to successfully log error information.';
            RETURN;
        END

        INSERT [Audit].[ErrorLog] 
            (
            [UserName], 
            [ErrorNumber], 
            [ErrorSeverity], 
            [ErrorState], 
            [ErrorProcedure], 
            [ErrorLine], 
            [ErrorMessage]
            ) 
        VALUES 
            (
            SYSTEM_USER, 
            @ErrorNumber,
            @ErrorSeverity,
            @ErrorState,
            @ErrorProcedure,
            @ErrorLine,
            @ErrorMessage
            );

        -- Pass back the ErrorLogID of the row inserted
        SET @ErrorLogID = @@IDENTITY;
    END TRY
    BEGIN CATCH
        PRINT 'An error occurred in stored procedure uspLogError: ';
        EXECUTE [dbo].[uspPrintError];
        RETURN -1;
    END CATCH
END;



GO
/****** Object:  StoredProcedure [dbo].[uspPrintError]    Script Date: 7/1/2017 3:49:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- uspPrintError prints error information about the error that caused 
-- execution to jump to the CATCH block of a TRY...CATCH construct. 
-- Should be executed from within the scope of a CATCH block otherwise 
-- it will return without printing any error information.
CREATE PROCEDURE [dbo].[uspPrintError] 
AS
BEGIN
    SET NOCOUNT ON;

    -- Print error information. 
    PRINT 'Error ' + CONVERT(varchar(50), ERROR_NUMBER()) +
          ', Severity ' + CONVERT(varchar(5), ERROR_SEVERITY()) +
          ', State ' + CONVERT(varchar(5), ERROR_STATE()) + 
          ', Procedure ' + ISNULL(ERROR_PROCEDURE(), '-') + 
          ', Line ' + CONVERT(varchar(5), ERROR_LINE());
    PRINT ERROR_MESSAGE();
END;




GO
/****** Object:  DdlTrigger [Audit_DDL]    Script Date: 7/1/2017 3:49:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

		CREATE TRIGGER [Audit_DDL] 
		ON DATABASE 
		FOR DDL_DATABASE_LEVEL_EVENTS
		AS 
		
			DECLARE @DynamicSQL AS NVARCHAR(MAX);			
			DECLARE @event XML;
			SET @event = EVENTDATA();

			DECLARE	
				@DDL_Event_Time AS DATETIME = REPLACE(CONVERT(NVARCHAR(50), @event.query('data(/EVENT_INSTANCE/PostTime)')), 'T', ' ')
				,@DDL_Login_Name AS NVARCHAR(150) = CONVERT(NVARCHAR(150), @event.query('data(/EVENT_INSTANCE/LoginName)'))
				,@DDL_User_Name AS NVARCHAR(150) = CONVERT(NVARCHAR(150), @event.query('data(/EVENT_INSTANCE/UserName)'))
				,@DDL_Server_Name AS NVARCHAR(150) = CONVERT(NVARCHAR(150), @event.query('data(/EVENT_INSTANCE/ServerName)'))
				,@DDL_Database_Name AS NVARCHAR(150) = CONVERT(NVARCHAR(150), @event.query('data(/EVENT_INSTANCE/DatabaseName)'))
				,@DDL_Schema_Name AS NVARCHAR(150) = CONVERT(NVARCHAR(150), @event.query('data(/EVENT_INSTANCE/SchemaName)'))
				,@DDL_Object_Name AS NVARCHAR(150) = CONVERT(NVARCHAR(150), @event.query('data(/EVENT_INSTANCE/ObjectName)'))
				,@DDL_Object_Type AS NVARCHAR(150) = CONVERT(NVARCHAR(150), @event.query('data(/EVENT_INSTANCE/ObjectType)'))
				,@DDL_Command AS NVARCHAR(max) = CONVERT(NVARCHAR(max), @event.query('data(/EVENT_INSTANCE/TSQLCommand/CommandText)'))
				,@DDL_CreateCommand AS NVARCHAR(max) = ''

			INSERT INTO Audit.Audit_DDL_Events
			VALUES (
				@DDL_Event_Time
				,@DDL_Login_Name
				,@DDL_User_Name
				,@DDL_Server_Name
				,@DDL_Database_Name
				,@DDL_Schema_Name
				,@DDL_Object_Name
				,@DDL_Object_Type
				,@DDL_Command
				,@DDL_CreateCommand
				);








GO
ENABLE TRIGGER [Audit_DDL] ON DATABASE
GO
USE [master]
GO
ALTER DATABASE [BSportTeamDB] SET  READ_WRITE 
GO
