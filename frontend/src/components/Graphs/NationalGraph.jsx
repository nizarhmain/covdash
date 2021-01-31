import { ResponsiveLine } from '@nivo/line'


import moment from 'moment'
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
        colors={{ scheme: 'nivo' }}
        curve="basis"
        enablePoints={false}
        axisBottom={{
            tickRotation: 90,
            // other code
            format: (tick) => moment(tick).format('DD-MM'),
        }}
        enableArea={true}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointLabelYOffset={-12}
        enableGridX={false}
        enableGridY={false}
        useMesh={true}

    />)
}
