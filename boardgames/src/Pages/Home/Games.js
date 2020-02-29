import React from 'react';
import { Card, Icon, Header, Button, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Games = ({ data }) => {
  console.log("DATA FROM GAMES:")
  console.log(data)
  return (
    <Card.Group itemsPerRow={1}>
      {data.map(game => 
        <Card key={game.id} as={Link} to={`/${game.id}`}>
          <Card.Content>
            <Header style={{fontWeight: "lighter", fontSize: "12px"}} floated='right' content={game.distance} />
            <Card.Header content={game.game} />
            <Card.Meta style={{ fontStyle: "italic", fontSize: "13px" }}>
              {game.minPlayers}-{game.maxPlayers} Players
            </Card.Meta> 
            <Card.Description style={{ color: "grey", fontWeight: "bold", fontSize: "12px" }}>
              {game.lender} {<Icon style={{marginRight: "0px", marginLeft: "10px"}} name="star" />}{game.rating}
            </Card.Description>
          </Card.Content>
          <Image.Group size="tiny">
            <Image src={game.images[0]} />
            <Image src={game.images[1]} />
            <Image src={game.images[2]} />
          </Image.Group>
          <Card.Content extra>
            <Button 
              basic
              color="yellow" 
              content="Rent Now" 
              fluid 
            />
          </Card.Content>
        </Card>
      )}
    </Card.Group>
  );
};

export default Games