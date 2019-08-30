# Snippets Database
## A database of flexible code snippets, with easy search, filter, and creation capabilities.


## Finding and using a Snippet

### USAGE
Upon finding the snippet required read through its description to understand how to use it properly. All snippets stored here will be dynamic enough that they can be used on any account with minimal customization. Identify the variables need to be replaced in the description and change them after copying and pasting.

As a general rule all snippets uploaded should declare any dynamic variables as constants at the top of the snippet as such: `const VARIABLE = "CHANGE_ME"`.

Read the description to understand how to replace the content within the quotes for each respective variable. Note that within the description these variables will appear as: `{VARIABLE}`.

#### Search:
Search for a snippet by 'Title', 'Description', 'Javascript Code', or 'Css Code'.

#### Filter:
You can filter Snippets by their respective tags. Selecting mulitiple filters is supported and can help you get more specific. Just click a filter to toggle it on/off.

#### Sort:
Use sort to browse Snippets in a more orderly fashion.


## Creating a new Snippet
If you are logged in with creation rights you will be able to create new Snippets. The idea is for anybody to easily reuse any snippet with minimal customization. To acquire this it is important to create the snippet in such a way that all use-case specific variables (ie. selectors) be easily accessible, and well documented. Refer to the below protocols to learn how to make this possible.

#### Title:
Create a short and descriptive title that summarizes what the snippet does.

#### Tags:
Add tags that are related to the specific use cases of the snippet. To create a new tag click "Add" within the sidebar. To delete a snippet right click on a snippet and enter the correct password.

#### Code:
As a general rule all snippets uploaded should declare any variables as constants at the top of the snippet in the following format: 
`const VARIABLE = "CHANGE_ME_WITH..."`.

#### Description:
The snippet description should be formated in a uniform fashion clearly stating the purpose, use cases, any exceptions, and well defining all dynamic variables.

##### Sample snippet description:
```
Show a visitor an alert with the {MESSAGE} upon clicking a specific {ELEMENT}.

VARIABLES TO REPLACE: 
* {ELEMENT} : set this variable as an element id.
* {MESSAGE} : set this variable with the text to be shown to the visitor.

- How to use: Place the snippet within the custom javascript section of the editor. 
- Notes:  This alert is not customizeable making it a less than ideal way of showing a message to visitors. For a more
          complete solution try to use a popin modal.
```

#### Placement:
Select the location that makes most sense to place the snippet. Provide further specifics in the description.

## Editing and deleting
If you are logged in any snippets that you have authored will have the option to edit / delete. Use these with caution.
