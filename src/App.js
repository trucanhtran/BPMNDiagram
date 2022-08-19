import { useLayoutEffect } from "react";
import "./App.css";

const JSON_BPMN =         `{ "class": "go.GraphLinksModel",
"linkFromPortIdProperty": "fromPort",
"linkToPortIdProperty": "toPort",
"modelData": {"position":"230 200"},
"nodeDataArray": [
{"category":"event", "item":"start", "key":101, "loc":"450 540", "text":"Start", "eventType":1, "eventDimension":1},
{"category":"event", "item":"End", "key":104, "loc":"1130 540", "text":"End", "eventType":1, "eventDimension":8},
{"category":"activity", "item":"generic task", "key":5, "loc":"1010 540", "text":"Send Invoice", "taskType":0, "boundaryEventArray": [ ] },
{"category":"activity", "item":"generic task", "key":-4, "loc":"860 540", "text":"Fulfill Order", "taskType":0, "boundaryEventArray": [ ] },
{"category":"activity", "item":"generic task", "key":-5, "loc":"710 540", "text":"Credit Check", "taskType":0, "boundaryEventArray": [ ] },
{"category":"activity", "item":"generic task", "key":-6, "loc":"560 540", "text":"Receive Order", "taskType":0, "boundaryEventArray": [ ] },
{"category":"annotation", "key":701, "loc":"494 434", "text":"Basic Order Process"}
],
"linkDataArray": [
{"from":101, "to":-6, "fromPort":"", "toPort":""},
{"from":-6, "to":-5, "fromPort":"", "toPort":""},
{"from":-5, "to":-4, "fromPort":"", "toPort":""},
{"from":-4, "to":5, "fromPort":"", "toPort":""},
{"from":5, "to":104, "fromPort":"", "toPort":""}
]}`
const App = () => {

  return (
    <>
      <button onClick={window['test']}>Test</button>
      <div>
        <div id="currentFile">(Unsaved File)</div>
        <div id="menuBar">
          <ul id="nav">
            <li>
              <a href="#">File</a>
              <ul>
                <li>
                  <a href="#" onClick="newDocument()">
                    New
                  </a>
                </li>
                <li>
                  <a href="#" onClick="openDocument()">
                    Open...
                  </a>
                </li>
                <li>
                  <a href="#" onClick="saveDocument()">
                    Save
                  </a>
                </li>
                <li>
                  <a href="#" onClick="saveDocumentAs()">
                    Save As...
                  </a>
                </li>
                <li>
                  <a href="#" onClick="removeDocument()">
                    Delete...
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#">Edit</a>
              <ul>
                <li>
                  <a href="#" onClick="myDiagram.commandHandler.undo()">
                    Undo
                  </a>
                </li>
                <li>
                  <a href="#" onClick="myDiagram.commandHandler.redo()">
                    Redo
                  </a>
                </li>
                <li>
                  <a href="#" onClick="myDiagram.commandHandler.cutSelection()">
                    Cut
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick="myDiagram.commandHandler.copySelection()"
                  >
                    Copy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick="myDiagram.commandHandler.pasteSelection()"
                  >
                    Paste
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick="myDiagram.commandHandler.deleteSelection()"
                  >
                    Delete
                  </a>
                </li>
                <li>
                  <a href="#" onClick="myDiagram.commandHandler.selectAll()">
                    Select All
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#">Align</a>
              <ul>
                <li>
                  <a href="#" onClick="myDiagram.commandHandler.alignLeft()">
                    Left Sides
                  </a>
                </li>
                <li>
                  <a href="#" onClick="myDiagram.commandHandler.alignRight()">
                    Right Sides
                  </a>
                </li>
                <li>
                  <a href="#" onClick="myDiagram.commandHandler.alignTop()">
                    Tops
                  </a>
                </li>
                <li>
                  <a href="#" onClick="myDiagram.commandHandler.alignBottom()">
                    Bottoms
                  </a>
                </li>
                <li>
                  <a href="#" onClick="myDiagram.commandHandler.alignCenterX()">
                    Center X
                  </a>
                </li>
                <li>
                  <a href="#" onClick="myDiagram.commandHandler.alignCenterY()">
                    Center Y
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#">Space</a>
              <ul>
                <li>
                  <a
                    href="#"
                    onClick="myDiagram.commandHandler.alignRow(askSpace())"
                  >
                    In Row...
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick="myDiagram.commandHandler.alignColumn(askSpace())"
                  >
                    In Column...
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#">Options</a>
              <ul>
                <li>
                  <a href="#">
                    <input
                      id="grid"
                      type="checkbox"
                      name="options"
                      value="grid"
                      onClick="updateGridOption()"
                    />
                    Grid
                  </a>
                </li>
                <li>
                  <a href="#">
                    <input
                      id="snap"
                      type="checkbox"
                      name="options"
                      value="0"
                      onClick="updateSnapOption()"
                    />
                    Snapping
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div id="PaletteAndDiagram">
          <div id="sideBar">
            <div className="handle">Palette:</div>
            <div id="myPalette"></div>
            <div className="handle">Overview:</div>
            <div id="myOverview"></div>
          </div>
          <div id="myDiagram"></div>
          <div id="description">
            <p>
              This sample describes templates and relationships typically used
              in{" "}
              <a href="http://en.wikipedia.org/wiki/Business_Process_Model_and_Notation">
                Business Process Model and Notation (BPMN)
              </a>
              , to be used as a starting point for developing BPMN or flow-like
              web applications.
            </p>
            <p>In addition to this HTML file, this sample uses the files:</p>
            <ul>
              <li>
                <a href="BPMN.css">BPMN.css</a> for styling
              </li>
              <li>
                <a href="BPMN.js">BPMN.js</a> for the Diagram logic
              </li>
              <li>
                <a href="BPMNClasses.js">BPMNClasses.js</a> - Custom PoolLink
                and BPMNLinkingTool classes
              </li>
              <li>
                <a href="DrawCommandHandler.js">DrawCommandHandler.js</a> -
                Custom CommandHandler class
              </li>
            </ul>
          </div>
        </div>

        <div id="openDocument" className="draggable">
          <div id="openDraggableHandle" className="handle">
            Open File
          </div>
          <div id="openText" className="elementText">
            Choose file to open...
          </div>
          <select id="mySavedFiles" className="mySavedFiles"></select>
          <br />
          <button
            id="openBtn"
            className="elementBtn"
            type="button"
            onClick="loadFile()"
            style={{ marginLeft: "70px" }}
          >
            Open
          </button>
          <button
            id="cancelBtn"
            className="elementBtn"
            type="button"
            onClick="closeElement('openDocument')"
          >
            Cancel
          </button>
        </div>

        <div id="removeDocument" className="draggable">
          <div id="removeDraggableHandle" className="handle">
            Delete File
          </div>
          <div id="removeText" className="elementText">
            Choose file to remove...
          </div>
          <select id="mySavedFiles2" className="mySavedFiles"></select>
          <br />
          <button
            id="removeBtn"
            className="elementBtn"
            type="button"
            onClick="removeFile()"
            style={{ marginLeft: "70px" }}
          >
            Remove
          </button>
          <button
            id="cancelBtn2"
            className="elementBtn"
            type="button"
            onClick="closeElement('removeDocument')"
          >
            Cancel
          </button>
        </div>
        <div style={{ visibility: "visible" }}>
          <div className="handle">JSON:</div>
          <div id="buttons">
            <button id="loadModel" onClick={window['loadModel']}>
              Load
            </button>
            <button id="saveModel" onClick={window['saveModel']}>
              Save
            </button>
          </div>
          <textarea
            id="mySavedModel"
            style={{ width: "100%", height: "300px" }}
          >
            {JSON_BPMN}
          </textarea>
        </div>
      </div>
    </>
  );
};

export default App;
