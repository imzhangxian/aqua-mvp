import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
const resources = {
    en: {
        translation: {
            "About text": "Welcome to Smart aqua project",
            "Nav title": "Smart Aqua System",
            "Menu home": "Home",
            "Menu details": "Details",
            "Menu about": "About",
            "Menu reports": "Reports",
            "Menu manage": "Management",
            "Menu blockchain": "Blockchain",
            "Menu bigdata": "Big Data",
            "label.username": "Username or email",
            "label.password": "Password",
            "btn.login": "Login",
            "btn.logout": "Logout",
            "Tab plants": "Plants",
            "Tab facilities": "Facilities",
            "Tab equipments": "Equipments",
            "btn.add": "Add",
            "modal.createEquipment": "Create Equipment",
            "label.number": "Number",
            "label.name": "Name",
            "label.category": "Category",
            "label.type": "Type",
            "label.subtype": "SubType",
            "label.model": "Model",
            "btn.submit": "Submit",
            "label.function": "Function",
            "label.assctFacility": "Installed Facility No.",
            "btn.close": "Close",
            "label.status": "Status",
            "label.operations": "Operations",
            "modal.createFacility": "Create Facility",
            "label.plantNumber": "Plant number", 
            "label.stageType": "Stage Type",
            "modal.createPlant": "Create Plant",
            "label.address": "Address",
            "label.coordination": "Coordination",
            "label.stages": "Stages",
            "label.influent": "Influent",
            "label.processing": "Processing",
            "label.effluent": "Effluent",
            "title.messages": "Messages",
            "Pre-Treatment": "Pre-Treatment",
            "Primary": "Primary",
            "Secondary": "Secondary", 
            "Tertiary": "Tertiary", 
            "Fourth": "Fourth", 
            "title.selectPlants": "Select a plant", 
            "title.about": "About Smart Aqua",
            "content.about": "English content coming soon ...",
            "about.more": "More ...", 
            "title.comingsoon": "Coming Soon",
            "content.comingsoon": "Exciting features coming soon ...",
            "placeholder": ""
        }
    },
    cn: {
        translation: {
            "About text": "欢迎使用智慧水务系统",
            "Nav title": "智慧水务系统",
            "Menu home": "监控台",
            "Menu details": "站点详情",
            "Menu about": "关于",
            "Menu reports": "报表",
            "Menu manage": "管理后台",
            "Menu blockchain": "区块链",
            "Menu bigdata": "大数据",
            "label.username": "用户名/电子邮件",
            "label.password": "密码",
            "btn.login": "登录",
            "btn.logout": "退出",
            "Tab plants": "厂区",
            "Tab facilities": "设施",
            "Tab equipments": "设备",
            "btn.add": "添加",
            "modal.createEquipment": "创建设备",
            "label.number": "编号",
            "label.name": "名称",
            "label.category": "机电/仪表",
            "label.type": "类型",
            "label.subtype": "子类型",
            "label.model": "厂商型号",
            "btn.submit": "提交",
            "label.function": "功能",
            "label.assctFacility": "所属设施",
            "btn.close": "关闭",
            "label.status": "状态",
            "label.operations": "操作",
            "modal.createFacility": "创建设施",
            "label.plantNumber": "所属厂区", 
            "label.stageType": "阶段",
            "modal.createPlant": "创建厂区",
            "label.address": "地址",
            "label.coordination": "坐标",
            "label.stages": "包含阶段",
            "label.influent": "进水",
            "label.processing": "处理中",
            "label.effluent": "出水",
            "title.messages": "信息列表",
            "Pre-Treatment": "预处理",
            "Primary": "主处理",
            "Secondary": "二次处理", 
            "Tertiary": "三次处理", 
            "Fourth": "四次处理", 
            "title.selectPlants": "选择厂区", 
            "title.about": "关于智慧水务",
            "content.about": "智慧水务云平台通过数据采集设备、无线网络设备、智能采集终端、\
            水质检测传感器、压力传感器、流量计、智能水表等在线监测设备实时感知城市供排水系统的运行状态，\
            并采用可视化的方式有机整合水务管理部门与供排水设施，并通过大数据分析技术将采集到的海量水务信\
            息进行分析与处理，生成水力模型并做出相应的处理结果辅助决策建议，实现从水源地到水龙头，水龙头\
            再到排污口全闭环管理流程，以更加精细和动态的方式实现水务系统的智慧管理。",
            "about.more": "了解更多 >>", 
            "title.comingsoon": "敬请期待",
            "content.comingsoon": "筹划中，敬请期待",
            "placeholder": ""
        }
    }
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "cn", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
        // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage

        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;