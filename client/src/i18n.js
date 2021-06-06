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