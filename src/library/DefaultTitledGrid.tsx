import { Grid, Box, Heading, Text, Card, Button, CardBody, CardFooter, CardHeader, ResponsiveContext } from "grommet";
import { ResponsiveGrid } from "../library/ResponsiveGrid";

const columns = {
    small: ['0','auto','0'],
    medium: ['xxsmall','auto','xxsmall'],
    large: ['auto', 'large', 'auto'],
};

const rows = {
    small: ['xxsmall', 'auto'],
    medium: ['xsmall', 'auto'],
    large: ['xsmall', 'auto'],
};

interface Props {
    title : String;
    children: React.ReactNode;
}

export default function ( props : Props ) {
    
    return <ResponsiveGrid
        rows={rows}
        columns={columns}
        areas={[
            { name: 'header', start: [0, 0], end: [2, 0] },
            { name: 'main', start: [1, 1], end: [1, 1] }
        ]}>   

        <Box gridArea="header" margin={{vertical: 'medium'}} justify="center">
            <Heading 
                color={'accent'}
                level='3' 
                margin='none' 
                textAlign="center"
                fill={true}>
                    {props.title}
            </Heading>
        </Box>

        <Box gridArea="main" fill>
            {props.children}
        </Box>
    </ResponsiveGrid>
    
        
}

