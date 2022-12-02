/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 * grid/index.tsx
 * hooks :
        * useLocations 
        *
 * last modify : 
 ******************************************************************************/

 
import { useSelector, useDispatch } from "react-redux"; // redux
import React, { useState, useEffect } from "react"; // default hooks
import { useLocations } from "hooks" // locations hooks
import { Space, SpaceProps } from "antd"; // component wrapper => space
import styled from "styled-components";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { GraphComponent } from "../graph";
import TextField from '@material-ui/core/TextField';
export type gridProps = {
        x:number;
        y:number;
        type?:string | undefined;
        data?:Array<object> | undefined;
        search?:Array<string> | undefined;
}
interface FinalgridProps extends gridProps, SpaceProps {};

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: '25ch',
        },
      },
        paper: {
       
        }
    }));

export const GridComponent : React.FunctionComponent<FinalgridProps> = ( props )=>{
        const { back, existBack, path } = useLocations();
        const [isLoading, setIsLoading] = useState<boolean>(true);
        const [typeOf,setTypeOf] = useState(props.type);
        const [eachObject,setEach] = useState(props.data);
        const [condition,setCondition] = useState(props.search);

        useEffect(()=>{
            if (props.data != null){
                setEach(props.data);
                setTypeOf(props.type);
            }
        }, [props.data]);

        useEffect(()=>{
            if (props.search != null){
                setCondition(props.search);
            }
        },[props.search]);

        var numberOfRow:Array<number> = [];
        var numberOfCol:Array<number> = [];
        for ( var i = 0; i < props.y; i++){
                numberOfCol.push(i);
        }
        for ( var i = 0; i < props.x; i++){
                numberOfRow.push(i);
        }

        const classes = useStyles();

        useEffect(()=>{
                // initialize here
        }, []);

        return (
            <div className={classes.root}>
                {numberOfCol.map(() => (
                    <Grid container
                        direction="row"
                        justify="space-evenly"
                        alignItems="center"
                        spacing={2}
                        >
                        {numberOfRow.map((key,idx) => (
                            <Grid key={key} item>
                                <Paper
                                    className={classes.paper}
                                    > 
                                     <form className={classes.root} noValidate autoComplete="off">
                                    {<TextField
                                        id="outlined"
                                        label={ (condition != null) ? condition[idx] +": " : null}
                                        defaultValue=""
                                        placeholder="Please Input"
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                          }}
                                        />}
                                    { (typeOf != undefined) ?
                                        <GraphComponent 
                                            type = {typeOf}
                                            data = {eachObject}
                                            />
                                    : null}
                                    </form>
                                </Paper>
                            </Grid>
                        ))}
                </Grid>
             ))}
            </div>
        );
}

const GridContainer = styled(Space)`
        width : 100%;
        height : 100%;
        margin : 0;
        padding : 0;
`;