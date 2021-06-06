import React from 'react';
import { useTranslation } from 'react-i18next';

const ComingSoon = () => {
    const { t, i18n } = useTranslation();
    return (
    <>
        <div className="card aqua-coming-soon">
            <img className="card-img-top" src="coming-soon.jpg" alt="Card image cap"/>
            <div className="card-body">
                <h5 className="card-title">{t("title.comingsoon")}</h5>
                <p className="card-text">{t("content.comingsoon")}</p>
            </div>
        </div>
    </>
  );
}
  
  export default ComingSoon;