import React from "react";

class Main extends React.Component {
  static propTypes = {
    limit: React.PropTypes.number
  }
  static defaultProps = {
    limit: 5
  }
	render() {
    let content = this.state.links.slice(0, this.props.limit).map(link => {
      return <li key={link._id}>
              <a href={link.url}>{link.title}</a>
            </li>
    });
		return (
			<div>
				<h3>Links</h3>
				<ul>
					{content}
				</ul>
			</div>
			);
	}
}

export default Main;