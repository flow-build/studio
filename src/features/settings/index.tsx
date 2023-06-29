import { Tabs } from './components/Tabs';
import { FlowbuildServer } from './FlowbuildServer';
import { MetabaseServer } from './MetabaseServer';
import * as S from './styles';

export default function Settings() {
  return (
    <S.Wrapper>
      <Tabs
        items={[
          { title: 'Flowbuild Server', element: FlowbuildServer },
          { title: 'MQTT Server', element: () => <h1>MQTT Server</h1> },
          { title: 'Metabase', element: MetabaseServer }
        ]}
      />
    </S.Wrapper>
  );
}
