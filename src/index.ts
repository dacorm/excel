import './scss/index.scss'
import {Excel} from "./components/excel/Excel";
import {Header} from "./components/header/Header";
import {Toolbar} from "./components/toolbar/Toolbar";
import {Formula} from "./components/formula/Formula";
import {Table} from "./components/table/Table";
import {createStore} from "./core/createStore";
import {rootReducer} from "./redux/rootReducer";
import {storage} from "./utils/storage";

const store = createStore(rootReducer, storage('excel-state'));

store.subscribe((state) => {
    console.log('App state', state);
    storage('excel-state', state);
})

const excel = new Excel({
    selector: '#app',
    options: {
        components: [Header, Toolbar, Formula, Table],
        store: store
    },

});

excel.render();