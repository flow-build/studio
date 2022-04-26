import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { is } from "bpmn-js/lib/util/ModelUtil";
import _ from "lodash";

import { setPropertiesDrawerItems, toggleDrawer } from "pages/workflows/diagram/features/bpmnSlice";
import { bpmnService } from "pages/workflows/diagram/services/bpmnService";
import { workflowService } from 'pages/workflows/diagram/services/workflowService';

import { statusColors } from 'pages/workflows/diagram/utils/statusColors';

import AceEditor from "react-ace";
import {
  Typography,
  TextField,
  Box,
  Button,
  InputLabel,
  FormControl,
  Drawer,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Tabs,
  Tab,
} from "@mui/material";
import { PropertiesDrawer } from "pages/workflows/diagram/components/panel/components/properties-drawer";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";

export const DiagramPanel: React.FC<any> = ({ modeler }) => {
  const dispatch = useDispatch();

  const [element, setElement] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isParametersModalActive, setIsParametersModalActive] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<any>([]);
  const [elementTab, setElementTab] = useState(0);
  const [history, setHistory] = useState([]);

  const [isDrawerActive, selectedProcess] = useSelector(({ bpmn }: any) => [bpmn.isDrawerActive, bpmn.selectedProcess]);

  const handleUpdateElement = (event: any) => {
    const { name, value } = event.target;
    const modeling = modeler.get("modeling");

    modeling.updateProperties(element, {
      [name]: value,
    });
  };

  const handleCodeEditorChanges = (value: any) => {
    const modeling = modeler.get("modeling");

    modeling.updateProperties(element, {
      "custom:parameters": value,
    });
  };

  const handleOnSelectItem = (items: any) => {
    if (!items) return;

    const modeling = modeler.get("modeling");

    if (items["category"])
      modeling.updateProperties(element, {
        [`custom:category`]: items["category"],
      });

    if (items["spec"])
      modeling.updateProperties(element, {
        [`custom:spec`]: items["spec"],
      });

    if (items["parameters"]) {
      if (Boolean(element?.businessObject.get("custom:parameters"))) {
        setSelectedProperty(items);
        setIsParametersModalActive(true);
      } else {
        modeling.updateProperties(element, {
          [`custom:parameters`]: JSON.stringify(items["parameters"]),
        });
      }
    }

    if (!element.businessObject.get("name")) {
      modeling.updateLabel(element, items["name"]);
    }

    setIsOpen(true);
  };

  const handleOnClose = () => setIsOpen(false);

  const handleGetProperties = async () => {
    try {
      setIsOpen(false);
      dispatch(toggleDrawer(true));
      const string = element.type.split(":")[1];
      const { data } = await dispatch<any>(
        bpmnService.endpoints.getProperties.initiate(string.toLowerCase())
      );

      dispatch(setPropertiesDrawerItems(data?.items));
    } catch (e: any) {
      console.error(
        `PropertiesControlPad/handleGetProperties => ${e.error}: ${e.message}`
      );
    }
  };

  const handleMergePropertyValues = (value: any) => {
    const modeling = modeler.get("modeling");

    modeling.updateProperties(element, {
      [`custom:parameters`]: JSON.stringify(
        _.merge(
          JSON.parse(element.businessObject.get("custom:parameters")),
          value
        )
      ),
    });
  };

  const handleSetElementTab = (event: any, newValue: any) => setElementTab(newValue);

  const handleFollowProcess = async () => {
    try {
      const { data: { workflow_id } } = await dispatch<any>(workflowService.endpoints.getProcessStateById.initiate(selectedProcess));

      const { data: diagram } = await dispatch<any>(workflowService.endpoints.getWorkflowDiagram.initiate(workflow_id));

      modeler.importXML(diagram);
      modeler.get("canvas").zoom("fit-viewport");

      const { data } = await dispatch<any>(workflowService.endpoints.getProcessHistory.initiate(selectedProcess));

      const orderedData = [...data].reverse();

      const modeling = modeler.get('modeling');
      const elementRegistry = modeler.get('elementRegistry');

      orderedData.forEach((history) => {
        const element = elementRegistry.get(`Node_${history.node_id}`);

        modeling.setColor(element, {
          fill: statusColors[`${history.status}`]
        });
      });

      setIsOpen(false);
    } catch (e: any) {
      console.error(`DiagramPanel/HandleFollowProcess => ${e.error}: ${e.message}`);
    }
  };

  useEffect(() => {
    async function getHistory() {
      try {
        const { data: history } = await dispatch<any>(workflowService.endpoints.getProcessHistory.initiate(selectedProcess));

        setHistory(history);
      } catch (e: any) {
        console.error(
          `DiagramPanel/useEffect/getHistory => ${e.error}: ${e.message}`
        );
      }
    }

    if (!selectedProcess) return;

    getHistory();
  }, [selectedProcess, dispatch]);

  useEffect(() => {
    if (!modeler) return;

    modeler.on("selection.changed", (e: any) => {
      if (!e.newSelection[0]) return;

      setElement(e.newSelection[0]);
      setIsOpen(true);
    });

    modeler.on("element.changed", (e: any) => {
      setElement(e.element);
    });
  }, [modeler]);

  if (!element) return <></>;

  return (
    <>
      <Drawer anchor="right" open={isOpen} onClose={handleOnClose}>
        <Box role="presentation" sx={{ width: 320, padding: 1 }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 1 }}>
            <Tabs
              value={elementTab}
              onChange={handleSetElementTab}
              aria-label="basic tabs props"
            >
              <Tab
                label="Propriedades"
                id="element-properties-tab"
                aria-controls="element-tabpanel-0"
              />
              {
                selectedProcess && (
                  <Tab
                    label="Histórico"
                    id="element-history-tab"
                    aria-controls="element-tabpanel-1"
                  />
                )
              }
            </Tabs>
          </Box>
          <Box
            component="div"
            role="tabpanel"
            id="element-properties-tab"
            aria-labelledby="element-tabpanel-0"
            hidden={elementTab !== 0}
          >
            <Typography variant="h6" component="h4" gutterBottom>
              Painel de Propriedades
            </Typography>
            {is(element, "custom:WorkflowInfo") && (
              <>
                <FormControl fullWidth variant="standard" sx={{ mb: 2 }}>
                  <TextField
                    label="Spec"
                    size="small"
                    name="custom:spec"
                    onChange={handleUpdateElement}
                    defaultValue={element.businessObject.get("custom:spec")}
                  />
                </FormControl>

                <FormControl fullWidth variant="standard">
                  <TextField
                    label="Category"
                    size="small"
                    name="custom:category"
                    defaultValue={element.businessObject.get("custom:category")}
                    onChange={handleUpdateElement}
                  />
                </FormControl>

                <Box sx={{ mt: 2, mb: 2 }}>
                  <InputLabel htmlFor="custom:parameters" sx={{ mb: 1 }}>
                    Parameters
                  </InputLabel>
                  <AceEditor
                    value={element?.businessObject.get("custom:parameters")}
                    mode="javascript"
                    theme="github"
                    name="custom:parameters"
                    width="100%"
                    onChange={handleCodeEditorChanges}
                    showPrintMargin={true}
                    showGutter={true}
                    highlightActiveLine={true}
                    wrapEnabled={true}
                    editorProps={{ $blockScrolling: true }}
                  />
                </Box>
              </>
            )}

            {is(element, "custom:WorkflowLane") && (
              <FormControl fullWidth variant="standard">
                <TextField
                  label="Rule"
                  size="small"
                  name="custom:rule"
                  defaultValue={element.businessObject.get("custom:rule")}
                  onChange={handleUpdateElement}
                />
              </FormControl>
            )}
            <Button variant="contained" fullWidth onClick={handleGetProperties} sx={{ mb: 1 }}>
              Propriedades Customizadas
            </Button>
            {
              selectedProcess && (is(element, 'bpmn:ServiceTask')) && (
                <Button variant="contained" fullWidth onClick={handleFollowProcess}>
                  Seguir Processo
                </Button>
              )
            }
          </Box>
          <Box
            role="tabpanel"
            hidden={elementTab !== 1}
            id="element-history-tab"
            aria-labelledby="element-tabpanel-1"
          >
            <Typography variant="h6" component="h4" gutterBottom>
              Histórico do Nó
            </Typography>

            {
              history.length > 0 ? history.filter((h: any) => h.node_id === element.id.replace('Node_', '')).map((h: any) => (
                <AceEditor
                  value={
                    JSON.stringify({ bag: h.bag, result: h.result, status: h.status })
                  }
                  mode="javascript"
                  theme="github"
                  name="custom:parameters"
                  width="100%"
                  onChange={handleCodeEditorChanges}
                  showPrintMargin={true}
                  showGutter={true}
                  wrapEnabled={true}
                  readOnly={true}
                  key={h.id}
                />
              )) : <Typography variant="subtitle2" >Selecione um processo para ver o histórico do elemento no diagrama</Typography>
            }
          </Box>
        </Box>
      </Drawer>
      <PropertiesDrawer
        isOpen={isDrawerActive}
        onSelectItem={handleOnSelectItem}
      />
      <Dialog
        onClose={() => setIsParametersModalActive(false)}
        open={isParametersModalActive}
      >
        <DialogTitle>Escolha uma Opção</DialogTitle>
        <List sx={{ pt: 0 }}>
          <ListItem
            button
            onClick={() => {
              handleCodeEditorChanges(
                JSON.stringify(selectedProperty?.parameters)
              );
              setIsParametersModalActive(false);
            }}
          >
            <ListItemText primary="Substituir valores antigos pelos novos." />
          </ListItem>
          <ListItem button onClick={() => setIsParametersModalActive(false)}>
            <ListItemText primary="Manter os valores atuais." />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              handleMergePropertyValues(selectedProperty.parameters);
              setIsParametersModalActive(false);
            }}
          >
            <ListItemText primary="Mesclar os valores antigos com os novos." />
          </ListItem>
        </List>
      </Dialog>
    </>
  );
};
