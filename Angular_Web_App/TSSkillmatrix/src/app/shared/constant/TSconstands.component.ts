import { QuerySearch } from "../models/QuerySearchModel.model";

export class AppSettings {
  public static API_service = 'http://skillmatrix.local/';

  /* server test */
  //public static API_service      ='http://10.99.1.43:81';

  //* server staging */
  //public static API_service = "http://10.99.1.44:82";

  public static Role_Admin = 11;
  public static Role_Manager = 12;
  public static Role_Technician = 13;

  public static GetQuerySeach(
    pagesize: number,
    pagenumber: number,
    itemname: string = null,
    itemid: number = null,
    typeid: number = null,
    note: string = null
  ) {
    let query = new QuerySearch();
    query.itemid = itemid;
    query.name = itemname;
    query.pagesize = pagesize;
    query.pagenumber = pagenumber;
    query.typeid = typeid;
    query.note = note;

    return query;
  }
}
