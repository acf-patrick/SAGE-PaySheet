import { CgExport } from "react-icons/cg";
import styled from "styled-components";
import writeXlsxFile from "write-excel-file";

const StyledExportXlsxButton = styled.button``;

function ExportXlsxButton({
  schema,
  data,
  fileName,
}: {
  schema: any;
  data: any[];
  fileName: string;
}) {
  const exportXlsx = async () => {
    await writeXlsxFile(data, {
      schema,
      fileName,
    });
  };
  return (
    <StyledExportXlsxButton onClick={exportXlsx}>
      <CgExport /> <span>Exporter</span>
    </StyledExportXlsxButton>
  );
}

export default ExportXlsxButton;
