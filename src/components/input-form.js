  input_form = () => {
    return (
      <div>
        <div><h2 className='instructions-header'>
          Input a new character here!
        </h2></div>
        <div className="input-struct">
          <div>
            <label>Name: </label>
            <input type="text" value={this.state.input_name}
              onChange={(e) => this.setState({ input_name: e.target.value })}
            />
          </div>
          <div>
            <label>Species: </label>
            <input type="text" value={this.state.input_species}
              onChange={(e) => this.setState({ input_species: e.target.value })}
            />
          </div>
          <div>
            <label>Age: </label>
                <input
                  size={5}
                  type="text" //needs to be text for maxLength to work
                  inputMode="numeric"
                  min={0}     //lowest val allowed
                  maxLength={4}
                  value={this.state.input_age}
                  placeholder= "0"
                  title="Please enter a number"
                  onChange={(e) => this.checkAgeNumber(e)}   //this method also uses setState
                />
           {/* TODO TRY DIVS FOR LABELS */}
          </div>
          <div>
            <label>Magic: </label>
            <input type="text" value={this.state.input_arcanetype}
              onChange={(e) => this.setState({ input_arcanetype: e.target.value })}
            />
          </div>
          <div>
            <label>Magic Color: </label>
            <input type="text" value={this.state.input_majik_color}
              onChange={(e) => this.setState({ input_majik_color: e.target.value })}
            />
          </div>
        </div> {/*end input structure*/}

        <div className="input-struct-row2">

          <div>
            <label>Weight: </label>
              <input
                size={5}
                type="text" //needs to be text for maxLength to work
                inputMode="numeric"
                min={0}     //lowest val allowed
                maxLength={5}
                value={this.state.input_weight}
                placeholder= "00.00"
                title="Please enter a number"
                onChange={(e) => this.checkWeightNumber(e)}   //this method also uses setState
              />
          </div>

          <DropdownWeightSelection
            value={this.state.selected_measurement}
            onChange={(e) => this.setState({ selected_measurement: e.target.value })}
          />
          {/* setup is in component */}

          <div>
            <label>Left Eye Color: </label>
            <input type="text" value={this.state.input_left_eye_color} size={10}
              onChange={(e) => this.setState({ input_left_eye_color: e.target.value })}
            />
          </div>
          
          <div>
            <label>Right Eye Color: </label>
            <input type="text" value={this.state.input_right_eye_color} size={10}
              onChange={(e) => this.setState({ input_right_eye_color: e.target.value })}
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
              Supporting
              </label>
            </div>

          </form>
        </div>
      
        <div className="button-container">
          <button className="submit-button"
            disabled={ this.state.input_name.length<1 || this.state.input_species.length<1 || this.state.input_age.length<1 
              || this.state.input_arcanetype.length<1 || this.state.input_majik_color.length<1
              || this.state.selected_radio_option.length<1 || this.state.input_right_eye_color.length<1
              || this.state.input_left_eye_color.length<1 }
            title="Please fill in all form elements"
            onClick={() => this.input_form_helper()}>Submit Character Info
          </button>
        </div>
      </div> //final input form div
    );
  };

  export default input_form