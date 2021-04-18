// import logo from './logo.svg';
import './App.css';
import Card from './components/card';
import React from 'react';
import Tabs from "./components/tabs";
// import mainchars from 'main-chars.json';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      apiResponse: {},
      input_name: "",
      input_species: "",
      input_age: "",
      input_arcanetype: "",
      input_majik_color: "",
      // input_importance: false,
      data: [],
      filtered_data: [],
      search_input: "",

      disabled: "",

      post_confirm : false
    };

    (async () => {
      let response = await fetch('http://localhost:5000/getAll');
      let response_json = await response.json();
      this.setState({ loaded: true });
      this.setState({ apiResponse: response_json });
      console.log(response_json);
    })();
  }

  render_helper = () => {
    if (this.state.apiResponse.hasOwnProperty('success')) {
      //this code runs if api call was successful and we have the response in this.state.apiResponse
      const mapped_cards = this.state.apiResponse.data.map((item) => {
        return <Card name={item.name} species={item.species} age={item.age} arcanetype={item.arcanetype} majik_color={item.majik_color} />
      });
      return <div>{mapped_cards}</div>;


      //end if block
    } else {
      return <p>content not loaded, make sure node is running</p>;
    }
  };

  input_form_helper = () => {
    (async () => {
      let response = await fetch("http://localhost:5000/post", {
        method: "POST",
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          char_name : this.state.input_name,
          species : this.state.input_species,
          age : this.state.input_age,
          arcanetype : this.state.input_arcanetype,
          majik_color: this.state.input_majik_color,
        })
      });

      let parsed_response = await response.json();
      if(parsed_response.success){
        this.setState({post_confirm : true});
      }
    })();
  };



  // handleInputChange = event => {
  //   const search_input = event.target.value;

  //   this.setState(prevState => {
  //     const filteredData = prevState.data.filter(element => {
  //       return element.name.toLowerCase().includes(search_input.toLowerCase());
  //     });

  //     return {
  //       search_input,
  //       filteredData
  //     };
  //   });
  // };

  // getData = () => {
  //   fetch(`http://localhost:4000/filterData`)
  //     .then(response => response.json())
  //     .then(data => {
  //       const { search_input } = this.state;
  //       const filteredData = data.filter(element => {
  //         return element.name.toLowerCase().includes(search_input.toLowerCase());
  //       });

  //       this.setState({
  //         data,
  //         filteredData
  //       });
  //     });
  // };

  // componentWillMount() {
  //   this.getData();
  // }

//   searchChar = char =>{
//     const {search_input} = this.state;
//     // var code = country.code.toLowerCase()

//     /*if( search !== "" && country.name.toLowerCase().indexOf( search.toLowerCase() ) === -1 ){
//         return null
//     }*/

//     return <Card name={item.name} species={item.species} age={item.age} arcanetype={item.arcanetype} majik_color={item.majik_color} />
// }

// onchange = e =>{
//   this.setState({ search_input : e.target.value });
// }

  post_confirmation = () => {
    if(this.state.post_confirm){
      return <p>POSTED SUCCESSFULLY RELOAD TO SEE CHANGES</p>
    }
    else{
      return <div></div>;
    }
  }

  check_contents = () => {
    if(this.state.input_name === '' || this.state.input_species === '' || this.state.input_age === '' || this.state.input_arcanetype === '' || this.state.input_majik_color === ''){
      {console.log("is empty")};
      <div>className={`submit-button.disabled ${this.state.disabled}`}</div>
    }
  }

  input_form = () => {
    return (
      <div>
        <div><h2 className='instructions-header'>
          Input a new character here!
        </h2></div>
        <div className="input-struct">
          <div>
            <label for="name">Name: </label>
            {/* <p>name</p> */}
            <input type="text" value={this.state.input_name}
              onChange={(e) => this.setState({ input_name: e.target.value })}
            />
          </div>
          <div>
          <label for="species">Species: </label>
          {/* <p>phone</p> */}
          <input type="text" value={this.state.input_species}
            onChange={(e) => this.setState({ input_species: e.target.value })}
          />
          </div>
          <div>
          <label for="age">Age: </label>
          <input type="text" value={this.state.input_age}
            onChange={(e) => this.setState({ input_age: e.target.value })}
          />
          </div>
          <div>
          <label for="arcane">Arcanetype: </label>
          {/* <p>phone</p> */}
          <input type="text" value={this.state.input_arcanetype}
            onChange={(e) => this.setState({ input_arcanetype: e.target.value })}
          />
          </div>
          <div>
          <label for="species">Majik Color: </label>
          {/* <p>phone</p> */}
          <input type="text" value={this.state.input_majik_color}
            onChange={(e) => this.setState({ input_majik_color: e.target.value })}
          />
        </div>
        </div>

        <div>
          <button className="submit-button"
            onMouseEnter={()=>this.check_contents()} onClick={() => this.input_form_helper()}>Submit Character Data
          </button>
        </div>

      </div>
    );
  };

  filter_input = () => {
    return (
      <div>
        <div><h2 className='instructions-header'>
          Type character name to filter results
        </h2></div>
        <div className="input-search-struct">
          <div>
            <label for="name">Name:</label>
            <input type="text" value={this.state.search_input} placeholder="search..."
              onChange={(e) => this.setState({ input_name: e.target.value })}
            />
           </div>
        </div>

        <div>
          {/* <button className="filter-button"
            onClick={() => this.filter_helper()}>Filter Character Data
          </button> */}
        </div>

      </div>
  );
};

  render() {
    return (
      <div>
        <h1 className="app-title">
          Imaginaries Index
        </h1>

        <Tabs> 
        {/* TAB 1 */}
       <div label="Create"> 
         <div className="char-info-block">
          {this.input_form()}
          {this.state.post_confirm ? <div>  data inserted -- reload to refresh list!</div> : <div></div>}
          {/* <div className="divide-line"></div>
          {this.filter_input()} */}
          {/* {this.state.post_confirm2 ? <div>data filtered!</div> : <div></div>} */}
          </div>
          {/* TODO: put filtered card below */}
       </div> 
       {/* TAB 2 */}
       <div label="Character List"> 
        <div><h2 className='instructions-header'>
            List of Characters
          </h2></div>
         <div className="char-info-block">
            {this.filter_input()}
            <div className="divide-line"></div>
            {this.render_helper()}            
          </div>
       </div> 
        </Tabs> 

        <hr></hr>
        {/* old display */}
        {/* <div className="char-info-block"> */}
          {/* {this.input_form()}
          {this.state.post_confirm ? <div>data inserted -- reload to refresh list!</div> : <div></div>} */}
          {/* <p>Full List:</p>
          {this.render_helper()} */}
          {/* {this.filter_input()}
          {this.state.post_confirm ? <div>data filtered!</div> : <div></div>}
          TODO: put filtered card below */}
        {/* </div> */}
      </div>
    );
  }
}

export default App;