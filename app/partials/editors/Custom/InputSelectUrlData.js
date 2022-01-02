import React, { useState, useEffect } from "react"
import { getEnumSelectData, getLookupSelectData  ,getLookupByUrl} from "../../../services/common.service"
import { MenuItem, Select, InputLabel, FormControl, FormHelperText } from "@material-ui/core"
import { Controller, useFormContext } from "react-hook-form"
import objectPath from "object-path"
import baseService from "../../../services/base.service"


const InputSelectUrlData = (props) => {
    const {
        enumType, lookupType, serverBinding,urlDatas,urlDatasParam, /* one of this */
        name, label, ...rest } = props
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false);
    const { control, errors, values } = useFormContext()
    useEffect(() => {
        setLoading(true)
        if (enumType) {
            getEnumSelectData(enumType).then(x => {
                setData(x.data);
            })
            setLoading(false)
        }
        else if (urlDatas && urlDatasParam.length > 0){
            baseService.post(urlDatas,{Id : urlDatasParam}).then(x => { 
                setData(x.data);
            })
            setLoading(false)
        } 
        else if (lookupType) {
            getLookupSelectData(lookupType).then(x => {
                setData(x.data);
            })
            setLoading(false)
        } else if (serverBinding) {
            baseService.post(serverBinding.url, serverBinding.filter || {}).then(res => {
                setData(res.data.map(r => (
                    {
                        id: r[serverBinding.valueField],
                        desc: r[serverBinding.textField]
                    })
                ));
                setLoading(false)
                console.log("selectlist",data);
            });
        } else {
            setLoading(false)
           // alert("wrong usage of dropdown")
        }

    }, [enumType, lookupType,urlDatasParam]);

    //simple name : "title" 
    //path name : "items[1].title"
    let namePath = name.replace(/\[(\w+)\]/g, '.$1') //items[1] => items.1
    let error = objectPath.get(errors, namePath);
    let hasError = !!error;
    //let value = values ? objectPath.get(values, namePath) : null;
console.log("urlDatasParam" , urlDatasParam)
    return (<>
        <FormControl variant="outlined" style={{ width: "100%" }} size="small">
            {console.log("selectlist",data)}
            <InputLabel error={hasError}>{label}</InputLabel>
            <Controller
                as={
                    <Select label={label} size="small" error={hasError}>
                        <MenuItem value={null}>
                            &nbsp;
                        </MenuItem>
                        {data && data.length > 0 && data.map(item =>
                            <MenuItem value={item.id} key={item.id}>{item.desc}</MenuItem>
                        )}
                    </Select>
                }
                name={name}
                control={control}
                {...rest}
            />
            {loading && (
                <i className="fa fa-spin fa-spinner" style={{ position: "absolute", top: "12px", left: "30px" }}></i>
            )}
            <FormHelperText>
                {hasError && (error.message)}
            </FormHelperText>
        </FormControl>
    </>);

}

export default InputSelectUrlData;