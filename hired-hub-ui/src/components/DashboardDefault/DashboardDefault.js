import React, { useEffect, useState } from "react";
import './DashboardDefault.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullhorn } from "@fortawesome/free-solid-svg-icons/faBullhorn";
import {faFilePowerpoint} from "@fortawesome/free-regular-svg-icons/faFilePowerpoint";
import {faFileLines} from "@fortawesome/free-regular-svg-icons/faFileLines";
import {faFileImport} from "@fortawesome/free-solid-svg-icons/faFileImport";
import {faEnvelope} from "@fortawesome/free-regular-svg-icons/faEnvelope";
import {faPhone} from "@fortawesome/free-solid-svg-icons/faPhone";
import image from "../../assets/images/index"
import { useDispatch, useSelector } from "react-redux";
import { fetchStatisticsDashboard } from "../../redux/statisticsSlice";
import { fetchUserInformation } from "../../redux/userSlice";
import Image from "../Image";

const DashboardDefault = () =>{
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const {statistics} = useSelector((state) => state.statistics);

    useEffect(() => {
        dispatch(fetchStatisticsDashboard());
        dispatch(fetchUserInformation());
    }, [dispatch]);

    return(
        <div className="dashbroad-default">
            <div className="dd-left">
                <div className="dd-left-title">
                    Hiệu quả tuyển dụng
                </div>
                <div className="dd-left-mid">
                    <div className="dd-left-mid-top">
                        <div className="dd-left-mid-top-l">
                            <div className="dd-left-mid-top-box" style={{backgroundColor: '#EBF3FF'}}>
                                <div className="dd-l-text-info">
                                    <h5 className="num-posting"
                                        style={{fontSize:'16px', marginBottom:'7px'}}
                                    >{statistics? statistics.postingCount : 0}</h5>
                                    <div style={{fontSize:'14px'}}
                                    >Tin tuyển dụng hiển thị</div>
                                </div>
                                <div className="ml-auto">
                                    <FontAwesomeIcon
                                        icon={faBullhorn}
                                        style={{ color: '#007bff', fontSize: '16px', marginRight: '10px' }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="dd-left-mid-top-r">
                            <div className="dd-left-mid-top-box" style={{backgroundColor: '#F5FFF9'}}>
                                <div className="dd-l-text-info">
                                    <h5 className="num-posting"
                                        style={{fontSize:'16px', marginBottom:'7px'}}
                                    >{statistics? statistics.cvactive : 0}</h5>
                                    <div style={{fontSize:'14px'}}
                                    >CV tiếp nhận</div>
                                </div>
                                <div className="ml-auto">
                                    <FontAwesomeIcon
                                        icon={faFilePowerpoint}
                                        style={{ color: '#00b14f', fontSize: '16px', marginRight: '10px' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="dd-left-mid-bottom">
                        <div className="dd-left-mid-bottom-l">   
                            <div className="dd-left-mid-top-box" style={{backgroundColor: '#fffae9'}}>
                                <div className="dd-l-text-info">
                                    <h5 className="num-posting"
                                        style={{fontSize:'16px', marginBottom:'7px'}}
                                    >{statistics? statistics.cvpending : 0}</h5>
                                    <div style={{fontSize:'14px'}}
                                    >CV ứng tuyển mới</div>
                                </div>
                                <div className="ml-auto">
                                    <FontAwesomeIcon
                                        icon={faFileLines}
                                        style={{ color: '#e5b500', fontSize: '16px', marginRight: '10px' }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="dd-left-mid-bottom-r">
                            <div className="dd-left-mid-top-box" style={{backgroundColor: '#fff3f2'}}>
                                <div className="dd-l-text-info">
                                    <h5 className="num-posting"
                                        style={{fontSize:'16px', marginBottom:'7px'}}
                                    >{statistics? statistics.cvdeactive : 0}</h5>
                                    <div style={{fontSize:'14px'}}
                                    >CV đã từ chối</div>
                                </div>
                                <div className="ml-auto">
                                    <FontAwesomeIcon
                                        icon={faFileImport}
                                        style={{ color: '#da4538', fontSize: '16px', marginRight: '10px' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dd-left-bottom">
                    <div className="dd-recruitment">
                        <img
                            src={image.recruitmentEmpty}
                            className="img-fluid"
                            alt="recruitment effective empty"
                            style={{
                                width:'300px',
                                height: '126px',
                            }}
                        />
                        {/* <div className="dd-text-center">
                            <span className="dd-text-muted">Chưa đủ dữ liệu để hiển thị</span>
                        </div> */}
                    </div>
                </div>
            </div>
            <div className="dd-right">
                <div className="dd-right-body">
                    <div className="dd-right-image">
                        <Image className='dd-right-avatar'
                            src={user?.avatar? user?.avatar : image.avatarDefault}
                            alt="User avatar"
                            fallback={ image.avatarDefault}
                            style={{maxWidth: "100%", maxHeight: "100%", aspectRatio: "1 / 1", objectFit:"cover",borderRadius: "50%" , marginLeft:"auto" , marginRight:"auto"}}
                        />
                    </div>
                    <div className="dd-right-infor">
                        <div className="dd-infor-name" style={{fontSize:'16px', fontWeight: 'bold'}}>
                            {user? `${user.firstName} ${user.lastName}`  : "Nguyễn Văn A"}
                        </div>
                        <div className="dd-infor-mail" style={{fontSize:'14px'}}>
                            <FontAwesomeIcon
                                icon={faEnvelope}
                                style={{ color: 'black', fontSize: '14px', marginRight: '10px' }}
                            />
                            {user?.account?.email}
                        </div>
                        <div className="dd-infor-sdt" style={{fontSize:'14px'}}>
                            <FontAwesomeIcon
                                icon={faPhone}
                                style={{ color: 'black', fontSize: '14px', marginRight: '10px' }}
                            />
                            {user? user.phoneNumber : "01234567890"}
                        </div>
                    </div>
                    <div className="dd-right-right">

                    </div>
                </div>
            </div>
        </div>
    );
}
export default DashboardDefault;