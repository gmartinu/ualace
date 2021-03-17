import React from 'react';
import Popper from '@material-ui/core/Popper';
import { ClickAwayListener, Button, Fab, makeStyles, MenuItem, MenuList, Paper, Tooltip } from '@material-ui/core';
import { ExpandMoreSharp, Add } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    absolute: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(3),
    },
}));

export default function SimplePopper({options, color, label, type, startIcon, disabled}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [popperSize, setSize] = React.useState(100);

    const classes = useStyles();

    const buttonRef = React.useRef();

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };
    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
        }
    }
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    React.useEffect(() => {
        setSize(buttonRef.current.offsetWidth)
    },[])

    return (
        <>
            {type === "fab" ? 
            <Tooltip title={label} aria-label={label}>
                <Fab disabled={disabled ? true : false} onClick={handleClick} color="primary" className={classes.absolute} aria-label={label}>
                    <Add />
                </Fab>
            </Tooltip>: 
            <Button ref={buttonRef} disabled={disabled ? true : false} startIcon={startIcon ? startIcon : null} color={color ? color : "twitter"} onClick={handleClick} style={{marginLeft: 10}}>
                {label} <ExpandMoreSharp />
            </Button>}
            <Popper id={id} open={open} anchorEl={anchorEl} style={{zIndex: 9999999, minWidth: popperSize}}> 
                <Paper>
                    <ClickAwayListener onClickAway={handleClick}>
                        <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                            {options ? 
                                options.map((item, idx) => {    
                                    const Icon = item.Icon;
                                    return (
                                        <MenuItem disabled={item.disabled ? true : false} key={idx} onClick={item.function ? () => {item.function(); handleClick();} : handleClick}>
                                            {item.Icon?
                                                <Icon style={{marginRight: 8}} />
                                            :null}
                                            {item.label}
                                        </MenuItem>
                                    )
                                })
                            :
                            <MenuItem onClick={handleClick}>Sem Opções</MenuItem>
                            }
                        </MenuList>
                    </ClickAwayListener>
                </Paper>
            </Popper>
        </>
    );
}
