
import baseService from './base.service'


export function getEnumSelectData(enumType){
  return baseService.post("/Common/GetEnumSelectData", {enumType});
}

export function getLookupSelectData(lookupType){
  return baseService.post("/Common/GetLookupSelectData", {lookupType});
}

