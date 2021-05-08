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
      selected_radio_option: "",
      
      data: [],
      filtered_data: [],
      search_input: "",

      

      post_confirm: false
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
          char_name: this.state.input_name,
          species: this.state.input_species,
          age: this.state.input_age,
          arcanetype: this.state.input_arcanetype,
          majik_color: this.state.input_majik_color,
          importance: this.state.selected_radio_option,
        })
      });

      let parsed_response = await response.json();
      if (parsed_response.success) {
        this.setState({ post_confirm: true });
      }
    })();
  };

  //todo: search function

  post_confirmation = () => {
    if (this.state.post_confirm) {
      return <p>POSTED SUCCESSFULLY RELOAD TO SEE CHANGES</p>
    }
    else {
      return <div></div>;
    }
  }

  //test for disabled cursor thingy
  // check_contents = () => {
  //   if (this.state.input_name === '' || this.state.input_species === '' || this.state.input_age === '' || this.state.input_arcanetype === '' || this.state.input_majik_color === '') {
  //     { console.log("is empty") };
  //     <div>className={`submit-button:disabled`}</div>
  //   }
  // }

  // for radio button tests
  handleOptionChange = changeEvent => {
    this.setState({
      selected_radio_option: changeEvent.target.value
    });
  };
  //still radio test
  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();
    console.log("You have submitted:", this.state.selected_radio_option);
  };
  //radio tests
  input_form = () => {
    return (
      <div>
        <div><h2 className='instructions-header'>
          Input a new character here!
        </h2></div>
        <div className="input-struct">
          <div>
            <label for="name">Name: </label>
            <input type="text" value={this.state.input_name}
              onChange={(e) => this.setState({ input_name: e.target.value })}
            />
          </div>
          <div>
            <label for="species">Species: </label>
            <input type="text" value={this.state.input_species}
              onChange={(e) => this.setState({ input_species: e.target.value })}
            />
          </div>
          <div>
            <label for="age">Age: </label>
            <input type="number" value={this.state.input_age} inputMode="numeric"
              text="Please insert a number"
              onChange={(e) => this.setState({ input_age: e.target.value })}
            />
          </div>
          <div>
            <label for="arcane">Magic: </label>
            <input type="text" value={this.state.input_arcanetype}
              onChange={(e) => this.setState({ input_arcanetype: e.target.value })}
            />
          </div>
          <div>
            <label for="species">Magic Color: </label>
            <input type="text" value={this.state.input_majik_color}
              onChange={(e) => this.setState({ input_majik_color: e.target.value })}
            />
          </div>

          <form onSubmit={this.handleFormSubmit}>

            <label>Story/Plot Importance: </label>
            <div className="form-check">
              <label>
                <input
                  type="radio"
                  value="option1"
                  checked={this.state.selected_radio_option === "option1"}
                  // onChange={this.handleOptionChange}
                  onChange={(e) => this.setState({ selected_radio_option: e.target.value })}
                  className="form-check-input"
                />
              Main
              </label>
            </div>

            <div className="form-check">
              <label>
                <input
                  type="radio"
                  value="option2"
                  checked={this.state.selected_radio_option === "option2"}
                  // onChange={this.handleOptionChange}
                  onChange={(e) => this.setState({ selected_radio_option: e.target.value })}
                  className="form-check-input"
                />
              Secondary
              </label>
            </div>

          </form>
        </div> {/*end input structure*/}

        <div className="button-container">
          <button className="submit-button"
            disabled={this.state.input_name.length<1}
            disabled={this.state.input_species.length<1}
            disabled={this.state.input_age.length<1}
            disabled={this.state.input_arcanetype.length<1}
            disabled={this.state.input_majik_color.length<1}
            onClick={() => this.input_form_helper()}>Submit Character Data
          </button>
        </div>
      </div> //final input form div
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
