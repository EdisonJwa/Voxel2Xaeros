import * as React from "react"
import { ChakraProvider } from "@chakra-ui/react"
import { Textarea, Link, Text, Heading, Box } from "@chakra-ui/react"


function Copyright() {
  return (
    <Text align="center">
      {'Copyright © '}
      <Link href="https://uv.uy/">
        Edison Jwa
      </Link>{' '}
      2015 - {new Date().getFullYear()}
      {'.'}
    </Text>
  );
}

function App({ Component }) {
  return (
    <ChakraProvider>
      <Transformer />
      <Copyright />
    </ChakraProvider>
  )
}

class Transformer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [],
      final: {},
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
    const values = event.target.value;
    const lines = values.split("\n");
    var result = {};

    lines.forEach(line => {
      const items = line.split(",");
      var map = {};
      items.forEach(item => {
        const [name, value] = item.split(":");
        map[name] = value;

      });

      if (result[map.dimensions] === undefined) result[map.dimensions] = "";
      result[map.dimensions] += `waypoint:${map.name}:${String(map.name).charAt(0)}:${map.x}:${map.y}:${map.z}:${Math.floor(Math.random() * 16)}:${!map.enabled}:0:gui.xaero_default:false:0:false\n`;
    });

    this.setState({ final: result });
  }

  render() {
    return (
      <Box w={window.innerWidth*0.8} p={4} m="20px auto">
        <Heading as="h1" size="xl" textAlign="center">
          Voxel to Xaero
        </Heading>
        <Heading as="h2" size="l" textAlign="center" m={5}>
          Change a voxelmap waypoint file to Xaero's minimap format
        </Heading>
        <Box
          as="form"
          p={4}
          borderWidth="1px"
          rounded="lg"
          shadow="1px 1px 3px rgba(0,0,0,0.3)"
        >

          <Textarea placeholder="Please paste your VoxelMap config here"  onChange={this.handleChange} />
          <Box>
            {Object.entries(this.state.final).map(([key, value]) => <div><Heading as="h2" size="m" >{key}</Heading><Text>{value}</Text></div>)}
            
        </Box>
        </Box>

        
        <div></div>
      </Box>
    );
  }
}

export default App;
