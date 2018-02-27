import React from 'react';
import {connect} from 'react-redux';
import {saveData} from '../action';

const mapStateToProps = state => {
    return {
        KEY: state.KEY
    };
}

const mapDispatchToProps = {
    saveData
};

class Footer extends React.Component{
    save() {
        let value = this.dom.value;
        if(!value) {
            return false;
        }
        this.props.saveData(value, false);
    }
    render() {
        return (
            <footer>
                <div>
                    <span>Task</span>
                    <input type="text" placeholder="你想做点什么" ref={node => this.dom = node} onKeyDown={e => {if(e.keyCode === 13) this.save()}} />
                </div>
                <button onClick={() => this.save()}>Save Task</button>
            </footer>
        );
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);