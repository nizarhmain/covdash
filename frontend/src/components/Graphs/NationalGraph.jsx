import { ResponsiveLine } from '@nivo/line'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export const NationalGraph = ({ data /* see data tab */ }) => {

    return (<ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', reverse: false }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        colorBy={d => d.color}
        curve="basis"
        enablePoints={false}
       
        axisBottom={null}
        enableArea={true}
        pointSize={10}
        pointBorderWidth={2}
        pointLabelYOffset={-12}
        enableGridX={false}
        enableGridY={false}
        useMesh={true}

    />)
}
