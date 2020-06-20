import React, {Component} from 'react';

// Bootstrap import
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tabs from 'react-bootstrap/Tabs';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Spinner from 'react-bootstrap/Spinner';

// Material UI Import
import IconButton from '@material-ui/core/IconButton';
import EditRounded from '@material-ui/icons/EditRounded';

// Handles the leftside Tab
class List extends Component {
  render() {
    if(this.props.isLoaded) return (
      <div>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                {this.props.semesters.map((semester, index) => {
                  return(
                    <Nav.Item key={index}>
                      <Nav.Link eventKey={`${semester.year}-${semester.semester}`}>{`${semester.year}-${semester.semester}`}</Nav.Link>
                    </Nav.Item>
                  )
                })}
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                {this.props.semesters.map((semester, index) => {                  
                  return(
                    <Tab.Pane key={index} eventKey={`${semester.year}-${semester.semester}`}>
                      <UpperTab words={this.props.words[index]} handleClickEdit={this.props.handleClickEdit}/>
                    </Tab.Pane>
                  )
                })}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    );
    else return <SpinnerAnimation />
  };
}

// Spinner
function SpinnerAnimation (props) {
  return(
    <Spinner animation="border" variant="success"  role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  )
}

// Stateless Functional Component
// Handles the upper tab and distribute correct words to the EachWord
function UpperTab (props) {
  // Looping languages
  const languages = ['Korean', 'English', 'Chinese', 'Japanese'];
    
  return (
    <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
      {languages.map((language, index) => {
        const words = props.words.filter(word => word.language === language)
        return(
          <Tab key={index} eventKey={language} title={language}>
            <EachWord words={words} handleClickEdit={props.handleClickEdit}/>
          </Tab>
        )
      })}
    </Tabs>
  )
}

// Stateless Functional Component
function EachWord (props) {
  return (
    <div>
      {props.words.map((word, index) => {
        return (
          <Card className="text-center" key={index}>
            <Card.Body>
              <Card.Text>
                {word.word} - {word.definition}
                <IconButton aria-label="edit" onClick={props.handleClickEdit}>
                  <EditRounded />
                </IconButton>
                <Badge style={{marginLeft: 12}} variant="success">Review</Badge>{' '}
              </Card.Text>
            </Card.Body>
          </Card>
        )
      })}
    </div>
  )
}

export default List;