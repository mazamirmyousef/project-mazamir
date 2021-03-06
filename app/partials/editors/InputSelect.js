import React, { useState, useEffect } from "react"
import { getEnumSelectData, getLookupSelectData } from "../../services/common.service"
import { MenuItem, Select, InputLabel, FormControl, FormHelperText } from "@material-ui/core"
import { Controller, useFormContext } from "react-hook-form"
import objectPath from "object-path"
import baseService from "../../services/base.service"


const InputSelect = (props) => {
    const {
        enumType, lookupType, serverBinding, /* one of this */
        name, label, url, filter ,textField , valueField , ...rest } = props
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
        } else if (lookupType) {
            getLookupSelectData(lookupType).then(x => {
                setData(x.data);
            })
            setLoading(false)
        } else if (url) {
            baseService.post(url, filter || {}).then(res => {
                setData(res.data.map(r => (
                    {
                        id: r[valueField],
                        desc: r[textField]
                    })
                ));
                setLoading(false)
                console.log("selectlist",data);
            });
        } else {
            alert("wrong usage of dropdown")
        }

    }, [enumType, lookupType]);

    //simple name : "title" 
    //path name : "items[1].title"
    let namePath = name.replace(/\[(\w+)\]/g, '.$1') //items[1] => items.1
    let error = objectPath.get(errors, namePath);
    let hasError = !!error;
    //let value = values ? objectPath.get(values, namePath) : null;

    return (<>
        <FormControl variant="outlined" style={{ width: "100%" }} size="small">
            <InputLabel error={hasError}>{label}</InputLabel>
            <Controller
                as={
                    <Select label={label} size="small" error={hasError}>
                        <MenuItem value={null}>
                            &nbsp;
                        </MenuItem>
                        {data.map(item =>
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

export default InputSelect;