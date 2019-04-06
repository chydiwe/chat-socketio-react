import React from 'react';
import {Link,} from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    button:{
        [theme.breakpoints.down('sm')]: {
            width: 90,
            height:40
        },
        [theme.breakpoints.up('md')]: {
            height:50

        },
        [theme.breakpoints.up('lg')]: {
            height:50
        },
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        [theme.breakpoints.down('sm')]: {
            width: 240,
        },
        [theme.breakpoints.up('md')]: {
            width: 400 ,
        },
        [theme.breakpoints.up('lg')]: {
            width: 640,
        },
        backgroundColor: theme.palette.common.white,
    },

});

class TextFields extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
        this.handleChange=this.handleChange.bind(this);
        this.handleKeyPress=this.handleKeyPress.bind(this);
        this.clearTextInput=this.clearTextInput.bind(this);
     }
    handleKeyPress(event){
        if(event.keyCode===13)
            this.clearTextInput()
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyPress);
    }
    componentWillUnmount() {

    }
    handleChange (event){
        this.setState({text: event.target.value});
    };
    clearTextInput(){
        this.props.func(this.state.text);
        this.setState({text:''});
    }
    render() {
        const {classes} = this.props;

        return (
            <div className={classes.container}>
                <TextField
                    id="standard-with-placeholder"
                    placeholder="текст"
                    value={this.state.text}
                    onChange={this.handleChange}
                    className={classes.textField}
                    margin="normal"
                    variant="filled"
                    autoFocus
                />
                {this.props.link.init?<Link to={`/${this.props.link.url}${this.state.text}`}>
                    <Button onClick={this.clearTextInput} variant="contained" color="primary" className={classes.button}>
                        Отправить
                    </Button>
                </Link>: <Button onClick={this.clearTextInput} variant="contained" color="primary" className={classes.button}>
                    Отправить
                </Button>}
            </div>)
    }
}

export default withStyles(styles)(TextFields);