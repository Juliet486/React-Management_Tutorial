import React from 'react';
import { post } from 'axios';

class CustomerAdd extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            file : null,  /*  바이너리 데이터 */
            userName: '',
            birthday : '',
            gender : '',
            job : '',
            fileName : '' /*  FileName string */
        }
    }

    handleFormSubmit =(e) => {
        e.preventDefault()
        this.addCustomer()
            .then((response) =>{
                console.log(response.data);

                //고객 목록 추가 후 고객 목록을 보여주는 부분만 갱신
                this.props.stateRefresh();
            })

        this.setState({
            file:null,
            userName:'',
            birthday:'',
            gender : '',
            job : '',
            fileName:''
        })

        //새롭게 등록된 고객의 정보를 반영하기 위해 새로고침... 그럼 위에 setState 초기화는 왜 하는거지?
        //window.location.reload();
        
    }

    handleFileChange = (e) =>{
        this.setState({
            file : e.target.files[0],
            fileName : e.target.value
        })
    }

    handleValueChange = (e) =>{
        let nextStage = {};
        nextStage[e.target.name] =e.target.value;
        this.setState(nextStage)
    }

    addCustomer = () =>{
        const url='/api/customers';
        const formData = new FormData();
        formData.append('image', this.state.file);
        formData.append('name', this.state.userName);
        formData.append('birthday', this.state.birthday);
        formData.append('gender', this.state.gender);
        formData.append('job', this.state.job);
        const config ={
            headers : {
                'content-type' : 'multipart/form-data'
            }
        }
        return post(url, formData, config); 
    }

    render(){
        return (
            <form onSubmit={this.handleFormSubmit}>
                <h1>고객 추가</h1>
                프로필 이미지 : <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange} /><hr/>
                이름 : <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}/><hr/>
                생년월일 : <input type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/><hr/>
                성별 : <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><hr/>
                직업 : <input type="text" name="job" value={this.state.job} onChange={this.handleValueChange}/><hr/>
                <button type="submit">추가하기</button>
            </form>
        )
    }
}

export default CustomerAdd;