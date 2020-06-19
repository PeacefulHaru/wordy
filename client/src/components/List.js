import React, {Component} from 'react';

// Bootstrap import
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tabs from 'react-bootstrap/Tabs';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

// Handles the leftside Tab
class List extends Component {
  render() {
    return (
      <div>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                {this.props.semesters.map(semester => {
                  return(
                    <Nav.Item>
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
                    <Tab.Pane eventKey={`${semester.year}-${semester.semester}`}>
                      <UpperTab words={this.props.words[index]}/>
                    </Tab.Pane>
                  )
                })}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    );
  }
}

// Stateless Functional Component
// Handles the upper tab and distribute correct words to the EachWord
const UpperTab = (props) => {
  // Looping languages
  const languages = ['Korean', 'English', 'Chinese', 'Japanese'];
    
  return (
    <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
      {languages.map(language => {
        const words = props.words.filter(word => word.language === language)
        return(
          <Tab eventKey={language} title={language}>
            <EachWord words={words}/>
          </Tab>
        )
      })}
    </Tabs>
  )
}

// Stateless Functional Component
const EachWord = (props) => {
  return (
    <div>
      {props.words.map(word => {
        return (
          <Card className="text-center">
            <Card.Body>
              <Card.Text>
                {word.word} - {word.definition}
                <Badge style={{marginLeft: 24}} variant="warning">Edit</Badge>
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