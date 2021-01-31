// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/bar
import { ResponsiveBar } from '@nivo/bar'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export const MyResponsiveBar = ({ data /* see data tab */ }) => (

    // handle the data correctly
    <ResponsiveBar
        id="bar_chart"
        data={data}
        keys={[ 'value' ]}
        indexBy="alias"
        margin={{ top: 50, right: 50, bottom: 50, left: 200 }}
        padding={0.1}
        borderRadius={9}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ datum: 'data.color' }}
        layout="horizontal"
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        animate={false}
        motionStiffness={90}
        axisBottom={false}
        motionDamping={15}
    />
)