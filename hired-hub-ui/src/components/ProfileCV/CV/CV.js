import React from 'react';
import './CV.scss'

function CV() {
    return (
        <div className='cv-review'>
            <div className='left'>
                <img src="https://static.topcv.vn/cv-builder/assets/default-avatar.fc9c40ba.png" alt="" data-v-88ff76e4=""/>
                <div
                    className="ql-editor"
                    contentEditable="true"
                    data-placeholder="Thông tin cá nhân"
                    spellCheck="false"
                >
                    <p className="ql-align-left" style={{ textTransform: 'uppercase' }}>
                    <strong className="ql-font-Roboto ql-size-18px">Thông tin cá nhân</strong>
                    </p>
                </div>
                {[
                    { icon: 'fa-calendar', placeholder: 'DD/MM/YY', value: '' },
                    { icon: 'fa-phone', placeholder: '0123 456 789', value: '' },
                    { icon: 'fa-envelope', placeholder: 'tencuaban@example.com', value: 'maxucchechatgpt@gmail.com' },
                    { icon: 'fa-location-dot', placeholder: 'Quận A, thành phố Hà Nội', value: '' }
                ].map((item, index) => (
                    <div className="render-item" data-draggable="true" key={index}>
                        <i className={`fa ${item.icon}`} style={{ fontSize: '14px', marginRight: '12px' }}></i>
                        <div uid={`${Math.random()}`} style={{ alignSelf: 'flex-start' }}>
                                <p>{item.value || item.placeholder}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className='right'>

            </div>

        </div>
    );
}

export default CV;
