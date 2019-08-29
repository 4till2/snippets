
export const name = ""    //  'brace-editor'	String	Unique Id to be used for the editor
export const placeholder = "" //	null	String	Placeholder text to be displayed when editor is empty
export const mode = ""    //  ''	String	Language for parsing and code highlighting
export const theme = 'github'  //  ''	String	theme to use
export const value = ''   //  ''	String	value you want to populate in the code highlighter
export const defaultValue = ''  //  ''	String	Default value of the editor
export const height = '200px'  //  '500px'	String	CSS value for height
export const width = '100%'  //	'500px'	String	CSS value for width
export const className = '' //   String	custom className
export const fontSize = 12  //	12	Number	pixel value for font-size
export const showGutter = true //	true	Boolean	show gutter
export const showPrintMargin = true //	true	Boolean	show print margin
export const highlightActiveLine = true//	true	Boolean	highlight active line
export const wrapEnabled = false //	false	Boolean	Wrapping lines
export const readOnly = false //	false	Boolean	make the editor read only
export const minLines = 0 //		Number	Minimum number of lines to be displayed
export const maxLines = 20 //		Number	Maximum number of lines to be displayed
export const enableBasicAutocompletion = false //	false	Boolean	Enable basic autocompletion
export const enableLiveAutocompletion = false //	false	Boolean	Enable live autocompletion
export const enableSnippets = false //	false	Boolean	Enable snippets
export const tabSize = 4 //	4	Number	tabSize
export const editorProps = {} //		Object	properties to apply directly to the Ace editor instance
export const setOptions = { enableBasicAutocompletion : false,
                            enableLiveAutocompletion : false,
                            enableSnippets : false,
                            showLineNumbers : true,
                            useWorker : false,
                            tabSize : 2
                        } //		Object	options to apply directly to the Ace editor instance
export const keyboardHandler = '' //		String	corresponding to the keybinding mode to set (such as vim or emacs)
export const commands = '' //		Array	new commands to add to the editor
export const annotations = '' //		Array	annotations to show in the editor i.e. [{ row = 0 column = 2 type = 'error' text = 'Some error.'}] displayed in the gutter
export const markers = '' //		Array	markers to show in the editor i.e. [{ startRow = 0 startCol = 2 endRow = 1 endCol = 20 className = 'error-marker' type = 'background' }]. Make sure to define the class (eg. ".error-marker") and set position = absolute for it.
export const style = '' //		Object	camelCased properties
