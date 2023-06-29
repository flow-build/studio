import { Tabs } from './components/Tabs';
import { FlowbuildServer } from './FlowbuildServer';
import { MqttServer } from './MqttServer';
import * as S from './styles';

export default function Settings() {
  return (
    <S.Wrapper>
      <Tabs
        items={[
          { title: 'Flowbuild Server', element: FlowbuildServer },
          { title: 'MQTT Server', element: MqttServer },
          { title: 'Metabase', element: () => <h1>Metabase</h1> }
        ]}
      />
    </S.Wrapper>
  );
}
