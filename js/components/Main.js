import React from "react";
import Relay from "react-relay";
import {debounce} from "lodash";

import Link from "./Link";
import CreateLinkMutation from "../mutations/CreateLinkMutation"

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.setVariables = debounce(this.props.relay.setVariables, 300);
  }
  search = (e) => {
    this.setVariables({ query: e.target.value });
  }
  setLimit = (e) => {
    this.setVariables({ limit: e.target.value });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    // Mutate
    Relay.Store.commitUpdate(
      new CreateLinkMutation({
        title: this.refs.newTitle.value,
        url: this.refs.newUrl.value,
        store: this.props.store
      })
    );
    this.refs.newTitle.value = "";
    this.refs.newUrl.value = "";
  }
  render() {
    let content = this.props.store.linkConnection.edges.map(edge => {
      return <Link key={edge.node.id} link={edge.node} />
    });
		return (
			<div>
				<h3>Links</h3>
        <form onSubmit={this.handleSubmit} >
          <input type="text" placeholder="Title..." ref="newTitle" />
          <input type="text" placeholder="Url..." ref="newUrl" />
          <button type="submit">Add</button>
        </form>
        Showing: &nbsp;
        <select onChange={this.setLimit}
            defaultValue={this.props.relay.variables.limit} >
          <option value ="100">100</option>
          <option value ="200">200</option>
        </select>
        <br/><br/>
        <input type="text" id="search" onChange={this.search} />
        <ul>
					{content}
				</ul>
			</div>
			);
	}
}

Main = Relay.createContainer(Main, {
  initialVariables: {
    limit: 100,
    query: ''
  },
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
        id,
        linkConnection(first: $limit, query: $query) {
          edges {
            node {
              id,
              ${Link.getFragment('link')}
            }
          }
        }
      }
    `
  }
});

export default Main;