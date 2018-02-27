import React from 'react';
import {connect} from 'react-redux';
import {getData, complete, changeData, deleteData} from '../action';

const mapStateToProps = state => {
    return state;
};

const mapDispatchToProps = {
    getData,
    complete,
    changeData,
    deleteData
};

class Main extends React.Component {
    componentDidMount() {
        this.props.getData();
    }

    checked(e) {
        let dom = e.target.parentNode;
        if(e.target.checked) {
            dom.style.background = '#e0efd7';
            dom.children[1].style.textDecoration = 'line-through';
            this.props.complete(e.target.checked);
            this.props.changeData(dom.children[1].innerText, e.target.checked);
        } else {
            dom.style.background = '#fff';
            dom.children[1].style.textDecoration = 'none';
            this.props.complete(e.target.checked);
            this.props.changeData(dom.children[1].innerText, e.target.checked);
        }
    }

    delete(e) {
        let value = e.target.parentNode.children[1].innerText,
            checkData = e.target.parentNode.children[0].checked;
        this.props.deleteData(value);
        if(checkData) {
            this.props.complete(!checkData);
        }
    }

    render() {
        const {data, completeNum} = this.props;
        return (
            <main>
                <ul>
                    {
                        data.map((item, index) => {
                            if(!item.checked) {
                                return (
                                    <li key={index}>
                                        <input type="checkbox" id={`check${index}`} defaultChecked={item.checked} onChange={e => this.checked(e)} />
                                        <label htmlFor={`check${index}`}>{item.data}</label>
                                        <span onClick={e => this.delete(e)}>删除</span>
                                    </li>
                                );
                            } else {
                                return (
                                    <li key={index} style={{background: '#e0efd7'}}>
                                        <input type="checkbox" id={`check${index}`} defaultChecked={item.checked} onChange={e => this.checked(e)} />
                                        <label htmlFor={`check${index}`} style={{textDecoration: 'line-through'}}>{item.data}</label>
                                        <span onClick={e => this.delete(e)}>删除</span>
                                    </li>
                                )
                            }
                        })
                    }
                </ul>
                <div>{completeNum}已完成 / {data.length}总数</div>
            </main>
        );
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);