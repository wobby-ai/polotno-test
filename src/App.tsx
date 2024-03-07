import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from 'polotno';
import { Toolbar } from 'polotno/toolbar/toolbar';
import { ZoomButtons } from 'polotno/toolbar/zoom-buttons';
import { SidePanel } from 'polotno/side-panel';
import { Workspace } from 'polotno/canvas/workspace';
import './components/Chart'

// import css styles from blueprint framework (used by polotno)
// if you bundler doesn't support such import you can use css from CDN (see bellow)
import '@blueprintjs/core/lib/css/blueprint.css';
import { StoreType, createStore } from 'polotno/model/store';
import { TextSection, SectionTab, SizeSection } from 'polotno/side-panel';

import { observer } from 'mobx-react-lite';



function App() {
  const store = createStore();
  const page = store.addPage();


  const CustomSection = {
    name: 'custom',
    Tab: (props: any) => (
      <SectionTab name="Charts" {...props}>

      </SectionTab>
    ),
    // we need observer to update component automatically on any store changes
    Panel: observer(({ store }: { store: StoreType }) => {
      return (
        <div>
          <button onClick={() => {
            store.activePage.addElement({
              type: 'chart',
              width: 800,
              height: 300,
            });
          }}>Add Chart</button>


        </div>
      );
    }),
  };

  const sections = [TextSection, CustomSection, SizeSection] as any[];

  const CustomSidePanel = () => {
    return (
      <SidePanel store={store} sections={sections} defaultSection="custom" />
    );
  };



  return (
    <PolotnoContainer style={{ width: '100vw', height: '100vh' }}>
      <SidePanelWrap>
        <CustomSidePanel />
      </SidePanelWrap>
      <WorkspaceWrap>
        <Toolbar store={store} downloadButtonEnabled />
        <Workspace store={store} />
        <ZoomButtons store={store} />
      </WorkspaceWrap>
    </PolotnoContainer>
  );
}

export default App
