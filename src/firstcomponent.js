import React, { Component } from 'react';
//import { element } from 'C:/Users/User/AppData/Local/Microsoft/TypeScript/3.5/node_modules/@types/prop-types';

class FirstComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            backgroundcolor: 'white'
        };
        this.addOne = this.addOne.bind(this);
        this.changeBgColor = this.changeBgColor.bind(this);
    }
    componentDidMount() {
        // setInterval(() => {
        //     this.setState((state) => ({
        //         count: state.count + 1
        //     })
        //     )
        // }, 1000);
    }

    addOne() {
        this.setState((state) => ({
            count: state.count + 1
        }));
    }

    changeBgColor(e) {
        var color=e.target.value;
        this.setState(()=>({
            backgroundcolor:color
        }));
        document.body.style = 'background: '+color+';';
    }

    componentWillUpdate() {

    }

    render() {
        var colors = ['yellow', 'red', 'black', 'purple', 'green', 'white'];
        var colorlist = colors.map(function (color) {
            return <option value={color}>{color}</option>;
        });
        return (

            <div>
                <div>  {this.state.count}</div>
                <div><button onClick={this.addOne}>Click to change</button></div>
                <div><select onChange={this.changeBgColor}>
                    {colorlist}
                </select></div>
            </div >
        )
    }
}

export default FirstComponent;