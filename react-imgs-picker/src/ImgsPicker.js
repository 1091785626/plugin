import React, { Component, PropTypes } from 'react';
import {Toast} from 'antd-mobile';

import lrz from 'lrz';//压缩图片后上传
import './ImgsPicker.scss';
import ImgItem from './ImgItem';
/**
 * 不需要redux
 */
import {filterBase64} from 'utils';
import net from 'net';
import API_ROOT from 'apiRoot';

import {OSS_CDN} from '../../../constants/constants';
class ImgsPicker extends Component {
	constructor(props, context) {
		super(props, context);	
		this.handleFile = this.handleFile.bind(this);
		this.promiseLrz=this.promiseLrz.bind(this);
		this.promiseOss=this.promiseOss.bind(this);
		this.promiseServer=this.promiseServer.bind(this);
		this.promiseState=this.promiseState.bind(this);

		this.handleDelete = this.handleDelete.bind(this);
	}
	componentWillMount() {
		this.state={
			imgs:this.props.imgs||[]
		};
	}

	handleFile(event){
		let files=event.target.files;
		let length=files.length;
		const {
			limit
		} = this.props;
		const {
			imgs
		} = this.state;
		if(limit<imgs.length+length){
			Toast.info(`最多上传${limit}张图`,1.5);
			return false;
		}
		let imgBase64;
		let ossUrl;
		let count=0;
		let success=0;
		let fail=0;
		Toast.hide();//hack
		Toast.loading(`${count}/${length}`,0);
		(async () => {
			for (let file of files) {
				try {
					Toast.hide();//hack
					Toast.loading(`${count++}/${length}`,0);
					//start
					imgBase64 = await this.promiseLrz(file);
					ossUrl = await this.promiseOss(imgBase64);
					//await this.promiseServer(ossUrl);
					await this.promiseState(ossUrl);
					//end
					success++;
				} catch (err) {
					fail++;
					console.error(err);
				}
			}
			Toast.hide();//hack
			Toast.info(`上传结果：${success}张成功，${fail}张失败`,3);
		})();
	}
	promiseLrz(file){//压缩图片
		return new Promise((resolve, reject) => {
			let reader;
			  reader = new FileReader();
			  reader.onload = () => {
				let  img = reader.result;
				//压缩图片后上传
				lrz(
					img,
					{
						width:100,
						height:100,
						quality: 0.7, 
						fieldName: "Filedata"
					}
				).then( (rst) => {
					// 先上传到oss
					resolve(rst.base64);
				}).catch( (err) => {
					reject('上传失败..');
				});

			  }; 
			  reader.readAsDataURL(file);
		});
	}
	promiseOss(img){//先上传到oss
		return new Promise((resolve, reject) => {
			let param = {
				upfile:filterBase64(img)
			};
			net.ajax({
				url: API_ROOT['_OSS_IMG_POST'],
				type: 'POST',
				param,
				success: (res) => {
					const imgUrl = res.data?`${OSS_CDN}${res.data.url}`:img;
					resolve(imgUrl);
				},
				error: (res) => {
					Toast.info(`${res.msg}-${res.retcode}`,1.5);
					reject('oss error');
				}
			});
		});
	}
	/**
	 * 外部函数
	 */
	promiseServer(oss){
		//必须是Promise对象,否则整个项目运行不了
		this.props.promiseServerFn&&this.props.promiseServerFn(oss);
	}
	/**
	 * 内部处理
	 */
	promiseState(ossUrl){
		return new Promise((resolve, reject) => {
			this.setState({
				imgs:[...this.state.imgs,ossUrl]
			},()=>{
				resolve();
			});
		});
	}
	handleDelete(img){
		let {
			imgs
		} = this.state;
		imgs = imgs.filter(value => value != img);
		this.setState({
			imgs
		});
	}
	getImgs(){
		return this.state.imgs;
	}
	render() {
		const {
			content,
			limit
		} = this.props;
		const {
			imgs
		} = this.state;
		// image/* -> image/jpg,image/jpeg,image/png,image/gif,image/bmp 处理chorme下卡断
		return(
			<div className="rc-imgs-picker">
				<p className="w-m-b">{content}</p>
				<div className="_imgs">
					{
						imgs.map((item,index)=>{
							return (
								<ImgItem key={index+item} img={item} onDelete={this.handleDelete}/>
							);
						})
					}
				</div>
				<div className="_border">
					<div className="_input">+
						<input 
							type="file" 
							accept="image/jpg,image/jpeg,image/png,image/gif,image/bmp" 
							multiple 
							onChange={this.handleFile}
						/>
					</div>
				</div>
				<small>请点击添加您的打款凭证截图，最多添加{limit}张图片</small>
			</div>
		);
	}
}
ImgsPicker.PropTypes = {
	content:PropTypes.string,
	/**
	 * 限制图片数量
	 */
	limit:PropTypes.number,
	/**
	 * 图片资源
	 */
	imgs:PropTypes.array,
	/**
	 * 将图片上传到服务器，1张1张上传，可调整一次性上传
	 */
	promiseServerFn:PropTypes.func,

};
ImgsPicker.defaultProps = {
	limit: 3,
	imgs:[],
	content:"上传图片"
};
export default ImgsPicker;