import React, {	Component} from 'react';
import {Navbar,	NavbarBrand} from 'reactstrap'
import Menu from './MenuComponent'
import DishDetail from './DishDetailComponent'
import {DISHES} from '../shared/dishes'


class Main extends Component {

	constructor(props) {
		super(props);
		this.state = {
			dishes: DISHES,
			selectedDish: null
		};
	}

	onDishSelect(dishID) {
		this.setState({
			selectedDish: dishID
		});
	}

	render() {
		return ( 
		<div>
			<Navbar dark  color="success">
			  <div className="container">
				<NavbarBrand href="/">Ristorante</NavbarBrand>
			  </div>
			</Navbar>
			<div className="container">
				<Menu dishes={this.state.dishes} onClick= {(dishID)=> {this.onDishSelect(dishID)}}/>
				<DishDetail dish = {this.state.dishes.filter((dish)=>{return dish.id===this.state.selectedDish})[0]} />
			</div>
			
		</div>
		);
	}
}

export default Main;