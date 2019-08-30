import React, {Component} from 'react';

// Import Brace and the AceEditor Component
import brace from 'brace';
import AceEditor from 'react-ace';

// Import a Mode (language)
import 'brace/mode/javascript';
import 'brace/mode/css';

// Import a Theme (okadia, github, xcode etc)
import 'brace/theme/github';

export default class Editor extends Component {
    constructor(props){
        super(props);
        this.state={
            value: this.props.value
        }
        this.handleChange=this.handleChange.bind(this)
    }
    handleChange(e){
        this.props.handleChange(this.props.mode === "javascript" ? 'jscode' : 'csscode', e)
    }
    render() {
        return (
            <div>
                <AceEditor
                    mode={this.props.mode}
                    theme="github"
                    onChange={this.handleChange}
                    name={this.props.id}
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    readOnly={this.props.readOnly}
                    defaultValue=''  //  ''	String	Default value of the editor
                    className='' //   String	custom className
                    showGutter={true} //	true	Boolean	show gutter
                    showPrintMargin={true} //	true	Boolean	show print margin
                    highlightActiveLine={true}//	true	Boolean	highlight active line
                    wrapEnabled={false} //	false	Boolean	Wrapping lines
                    // maxLines={20} //		Number	Maximum number of lines to be displayed
                    enableBasicAutocompletion={true} //	false	Boolean	Enable basic autocompletion
                    enableLiveAutocompletion={true} //	false	Boolean	Enable live autocompletion
                    enableSnippets={false} //	false	Boolean	Enable snippets
                    tabSize={4} //	4	Number	tabSize
                    setOptions={{ 
                        enableBasicAutocompletion : true,
                        enableLiveAutocompletion : false,
                        enableSnippets : false,
                        showLineNumbers : true,
                        useWorker : false,
                        tabSize : 2
                    }} //		Object	options to apply directly to the Ace editor instance
                    keyboardHandler='' //		String	corresponding to the keybinding mode to set (such as vim or emacs)
                    commands={[]} //		Array	new commands to add to the editor
                    annotations={[]} //		Array	annotations to show in the editor i.e. [{ row=0 column=2 type='error' text='Some error.'}] displayed in the gutter
                    markers={[]} //		Array	markers to show in the editor i.e. [{ startRow=0 startCol=2 endRow=1 endCol=20 className='error-marker' type='background' }]. Make sure to define the class (eg. ".error-marker") and set position=absolute for it.
                    style={{height: '200px',
                            width:'100%',
                            fontSize: '12px'
                        }} //		Object	camelCased properties
                   
                />
            </div>
        );
    }
}