import {Location} from "./location";
export interface ToDo {
  name                      :  string;
  done                      :  boolean;
  id?                       :  string;
  author                    :  string;
  imgUrl                    :  string;
  location                  :  Location;
}



