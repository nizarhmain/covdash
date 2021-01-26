
import React from "react";
import { shallow, mount } from "enzyme";
import Dashboard from "./components/Dashboard"

let options = {
    disableLifecycleMethods: true
}


describe("testing the dashboard component", () => {

    jest.setTimeout(30000)
    beforeEach(() => {
        jest.resetModules() // most important - it clears the cache
        process.env.REACT_APP_SERVER_URL = 'https://nizapizza.com/api'
    });

    it("renders without crashing", () => {
        shallow(<Dashboard />);
    });

    it("fetches data properly, REST needs to be on for this test", async () => {


        const dashboard = shallow(<Dashboard />);
        await dashboard.instance().getRegions("https://nizapizza.com/api/latest")
        expect(dashboard.state().lastUpdate).not.toBe('')
        expect(dashboard.state().region).not.toBeNull()
        expect(dashboard.state().selectedProperty).toBe('deceduti')

        // console.log(process.env)
        // expect(wrapper.props().user).toEqual(user);
    });

    it("setting property from alias", async () => {

        const list = ['Abruzzo', 'Basilicata', 'Campania', 'Emilia-Romagna', 'Friuli-Venezia Giulia', 'Lazio', 'Liguria', 'Lombardia', 'Marche', 'Trentino-Alto Adige/Südtirol', `Valle d'\Aosta/Vallée d'Aoste`]

        const dashboard = shallow(<Dashboard />);
        await dashboard.instance().getRegions("https://nizapizza.com/api/latest")

        list.forEach(alias => {
            dashboard.instance().setRegionFromAlias(alias)
            expect(dashboard.state().region.reg_name).toBe(alias)
        });
    });

    it("getting the right color from the property", async () => {
        const dashboard = shallow(<Dashboard />);
        expect(dashboard.instance().adjustColorIntensity('red', 8583, 26666)).toBe('hsl(0, 50%, 81%)')
        expect(dashboard.instance().adjustColorIntensity('red', 740, 26666)).toBe('hsl(0, 50%, 98%)')
        expect(dashboard.instance().adjustColorIntensity('green', 49015, 234244)).toBe('hsl(114, 50%, 87%)')
        expect(dashboard.instance().adjustColorIntensity('green', 3945, 234244)).toBe('hsl(114, 50%, 99%)')
    });




});
