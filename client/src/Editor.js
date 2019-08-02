import React, { Component } from 'react';
import AceEditor from 'react-ace';

import "brace/mode/javascript";
import "brace/theme/github";

export default class Editor extends Component {
    state = {
        //prop default type description
        name: this.props.mode,           //  'brace-editor'	String	Unique Id to be used for the editor
        placeholder: this.props.mode == 'javascript' ? 'Insert Javascript here' : 'Insert CSS here',    //	null	String	Placeholder text to be displayed when editor is empty
        mode: this.props.mode,           //  ''	String	Language for parsing and code highlighting
        theme: 'github',          //  ''	String	theme to use
        value: this.props.value || '',          //  ''	String	value you want to populate in the code highlighter
        defaultValue: '',   //  ''	String	Default value of the editor
        height: '40vh',         //  '500px'	String	CSS value for height
        width: '50%',          //	'500px'	String	CSS value for width
        className: '',      //   String	custom className
        fontSize: 12,       //	12	Number	pixel value for font-size
        showGutter: true,     //	true	Boolean	show gutter
        showPrintMargin: true, //	true	Boolean	show print margin
        highlightActiveLine: true, //	true	Boolean	highlight active line
        wrapEnabled: false, //	false	Boolean	Wrapping lines
        readOnly: this.props.readOnly || false, //	false	Boolean	make the editor read only
        minLines: 0, //		Number	Minimum number of lines to be displayed
        maxLines: 20, //		Number	Maximum number of lines to be displayed
        enableBasicAutocompletion: false, //	false	Boolean	Enable basic autocompletion
        enableLiveAutocompletion: false, //	false	Boolean	Enable live autocompletion
        enableSnippets: false, //	false	Boolean	Enable snippets
        tabSize: 4, //	4	Number	tabSize
        editorProps: {}, //		Object	properties to apply directly to the Ace editor instance
        setOptions: {
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: false,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 2,
        }, //		Object	options to apply directly to the Ace editor instance
        keyboardHandler: '', //		String	corresponding to the keybinding mode to set (such as vim or emacs)
        commands: '', //		Array	new commands to add to the editor
        annotations: '', //		Array	annotations to show in the editor i.e. [{ row: 0, column: 2, type: 'error', text: 'Some error.'}], displayed in the gutter
        markers: '', //		Array	markers to show in the editor, i.e. [{ startRow: 0, startCol: 2, endRow: 1, endCol: 20, className: 'error-marker', type: 'background' }]. Make sure to define the class (eg. ".error-marker") and set position: absolute for it.
        style: '', //		Object	camelCased properties

    }
    changeValue = (e) => {
        let codeType = this.props.mode == 'javascript' ? 'jscode' : 'csscode';
        this.setState({value: e})
        this.props.update(codeType, this.state.value)
    }
    render(){
        return (
            <AceEditor
            placeholder={this.state.placeholder}
            mode='javascript'
            theme='github'
            onChange={(e) => this.changeValue(e)}
            fontSize={this.state.fontSize}
            showPrintMargin={this.state.showPrintMargin}
            showGutter={this.state.showGutter}
            highlightActiveLine={this.state.highlightActiveLine}
            value={this.state.value}
            setOptions={this.state.setOptions}
            readOnly={this.state.readOnly}
            height={this.state.height}
            width={this.state.width}/>          
        )
    }
}

