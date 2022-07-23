import React, { Component, ReactNode } from 'react';
import { Box, Button, Heading } from 'grommet';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { Icon } from 'grommet-icons';

interface NavIcon {
    path : string;
    icon: Icon
}
interface Props {
    title : string;
    icons : NavIcon[]
}

export default function ( props : Props ) {

    const navigate = useNavigate();
    const location = useLocation();

    const titleActive = location.pathname == '/create'
    const titleColor = titleActive ? 'accent' : undefined

    const icons = props.icons.map((icon : NavIcon) => {
        return <Button
            key={icon.path}
            icon={<icon.icon color={location.pathname==icon.path ? 'accent' : undefined}/>}
            onClick={() => {
                navigate(icon.path)
            }}
        />
    });


    return <Box fill margin={{top: 'small'}}>
        <>
            <Box
                tag='header'
                direction='row'
                align='center'
                justify='between'
                background='offwhite'
                pad={{ left: 'medium', right: 'small', vertical: 'small' }}
                style={{ zIndex: '1'}}
            >
                <Heading 
                    color={titleColor}
                    level='3' 
                    margin='small' 
                    style={{ cursor: 'pointer' }} 
                    onClick={() => {navigate('/create')}}>
                    {props.title}
                </Heading>
                <div>
                    {icons}
                </div>
            </Box>
            <Outlet />
        </>
    </Box>
}

