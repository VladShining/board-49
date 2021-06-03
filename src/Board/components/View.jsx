import React from 'react';
import './View.scss';

class Grille extends React.Component{
    // eslint-disable-next-line
    constructor(props){
        super(props);
    }
    
    render (){
        return <div className='Layout'>
            this is layout {this.props.myProps}     
            {this.props.yourProps}
        </div>
        
    }
}
export default Grille;