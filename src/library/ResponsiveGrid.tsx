import { ResponsiveContext, Grid } from "grommet";

interface Props {
    areas : {
        name: string,
        start: [number, number],
        end: [number, number]
    }[]
    rows : {
        [key: string] : string[]
    }
    columns : {
        [key: string] : string[]
    }
    children : React.ReactNode | React.ReactNode[]
}


export const ResponsiveGrid = ( props : Props ) => {

    const getColumns = ( size : string ) => {
        if ( props.columns[size] ) {
            return props.columns[size];
        }
        throw new Error(`No columns defined for size ${size}`);
    }

    const getRows = ( size : string ) => {
        if ( props.rows[size] ) {
            return props.rows[size];
        }
        throw new Error(`No rows defined for size ${size}`);
    }

    const renderChildren = ( size : string ) => {
   
        const columns = getColumns(size);
        const rows = getRows(size);
        const children = props.children;

        return <Grid 
            areas={props.areas}
            rows={rows} 
            columns={columns}
            gap='small'>
            {children}
        </Grid>
    }


    return <ResponsiveContext.Consumer>
       { renderChildren }
    </ResponsiveContext.Consumer> 

}