import React from 'react';
import { useTranslation } from 'react-i18next';

const About = () => {
    const { t, i18n } = useTranslation();
    return (
    <>
        <div className="card aqua-about">
            <img className="card-img-top" src="potable-water.jpg" alt="Card image cap"/>
            <div className="card-body">
                <h5 className="card-title">{t("title.about")}</h5>
                <p className="card-text">{t("content.about")}</p>
                <a href="#" className="btn btn-primary">{t("about.more")}</a>
            </div>
        </div>
    </>
  );
}
  
  export default About;