module.exports = {
	//欢迎页
	'/':require('../hound/common/main/welcome'),

	//练习
	'bar/nav':require('../blades/components/UIBars/MyNavBar'),
	'bar/notice':require('../blades/components/UIBars/MyNotice'),
	'bar/search':require('../blades/components/UIBars/MySearch'),
	'bar/tab':require('../blades/components/UIBars/MyTab'),

	'view/accordion':require('../blades/components/UIViews/MyAccordion'),
	'view/action':require('../blades/components/UIViews/MyAction'),
	'view/card':require('../blades/components/UIViews/MyCard'),
	'view/drawer':require('../blades/components/UIViews/MyDrawer'),
	'view/drawer/dock':require('../blades/components/UIViews/DrawerDock'),
	'view/list':require('../blades/components/UIViews/MyList'),
	'view/listview':require('../blades/components/UIViews/MyListView'),
	'view/modal':require('../blades/components/UIViews/MyModal'),
	'view/menu':require('../blades/components/UIViews/MyMenu'),
	'view/popup':require('../blades/components/UIViews/MyPop'),
	'view/popover':require('../blades/components/UIViews/MyPopOver'),
	'view/result':require('../blades/components/UIViews/MyResult'),
	'view/table':require('../blades/components/UIViews/MyTable'),
	'view/toast':require('../blades/components/UIViews/MyToast'),

	'control/indicator':require('../blades/components/UIControls/MyIndicator'),
	'control/button':require('../blades/components/UIControls/MyButton'),
	'control/button/demo':require('../blades/components/UIControls/ButtonDemo'),
	'control/badge':require('../blades/components/UIControls/MyBadge'),
	'control/carousel':require('../blades/components/UIControls/MyCarousel'),
	'control/carousel/demo':require('../blades/components/UIControls/CarouselDemo'),
	'control/checkbox':require('../blades/components/UIControls/MyCheckBox'),
	'control/datepicker':require('../blades/components/UIControls/MyDate'),
	'control/imagepicker':require('../blades/components/UIControls/MyImage'),
	'control/input':require('../blades/components/UIControls/MyInput'),
	'control/page':require('../blades/components/UIControls/MyPage'),
	'control/picker':require('../blades/components/UIControls/MyPicker'),
	'control/progress':require('../blades/components/UIControls/MyProgress'),
	'control/radio':require('../blades/components/UIControls/MyRadio'),
	'control/refresh':require('../blades/components/UIControls/MyRefresh'),
	'control/slider':require('../blades/components/UIControls/MySlider'),
	'control/switch':require('../blades/components/UIControls/MySwitch'),
	'control/stepper':require('../blades/components/UIControls/MyStepper'),
	'control/step':require('../blades/components/UIControls/MyStep'),
	'control/swip':require('../blades/components/UIControls/MySwip'),
	'control/segment':require('../blades/components/UIControls/MySegment'),
	'control/textarea':require('../blades/components/UIControls/MyArea'),
	'control/tab':require('../blades/components/UIControls/MyTabs'),
	'control/tag':require('../blades/components/UIControls/MyTag'),

	'others/flex':require('../blades/components/others/MyFlex'),
	'others/grid':require('../blades/components/others/MyGrid'),
     
    //遇到的问题
    'studydemo/DangerouslySetInnerHTMl':require('../blades/components/studydemo/DangerouslySetInnerHTMl'),

	//notFound
	'*':require('../hound/common/main/notFound'),
}
