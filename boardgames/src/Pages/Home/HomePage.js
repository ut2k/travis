import React, { useContext, createRef } from 'react';
import { AppState } from '../../context';
import Games from './Games';
import { Button, Header, Container, Segment, Sticky, Grid, Input } from 'semantic-ui-react';

const HomePage = () => {
  const state = useContext(AppState);
  const { data } = state;
  console.log(data)
  const contextRef = createRef();

  return (
    <div ref={contextRef}>
      <Sticky context={contextRef}>
        <PageHeader />
      </Sticky>
      <Container>
        <Grid padded textAlign="center">
          <Grid.Row>
            <Input icon='search' iconPosition='left' placeholder="Search..." />
            <Button style={{ marginLeft: "20px"}} basic content="Filter" />
          </Grid.Row>
          <Grid.Row>
            <Games data={data} />
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
};

const PageHeader = () => {
  return (
    <Segment
      basic
      attached='top'
      style={{ backgroundColor: "orange", textAlign: "center" }}
      fluid="true"
    >
      <Header content="Marketplace" size="large" />
    </Segment>
  );
};

export default HomePage;