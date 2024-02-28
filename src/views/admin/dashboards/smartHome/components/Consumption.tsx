// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
  useTheme,
} from '@chakra-ui/react';
import Card from 'components/card/Card';
// Custom components
import { MdPieChart } from 'react-icons/md';
import BarChart from 'components/charts/BarChart';
import { useState } from 'react';

import {
  barChartDataConsumption,
  barChartOptionsConsumption,
} from 'variables/charts';

export default function Consumption(props: { [x: string]: any }) {
  const { ...rest } = props;

  const theme = useTheme();
  //eslint-disable-next-line
  const [chartColor, setChartColor] = useState(theme.colors.brand[500]);

  const newOptions = {
    ...barChartOptionsConsumption,

    fill: {
      type: 'solid',
      colors: [chartColor, '#6AD2FF', '#E1E9F8'],
    },
    colors: [chartColor, '#6AD2FF', '#E1E9F8'],
  };
  // Chakra Color Mode
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const iconColor = useColorModeValue('brand.500', 'white');
  const bgButton = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
  const bgHover = useColorModeValue(
    { bg: 'secondaryGray.400' },
    { bg: 'whiteAlpha.50' },
  );
  const bgFocus = useColorModeValue(
    { bg: 'secondaryGray.300' },
    { bg: 'whiteAlpha.100' },
  );
  return (
    <Card alignItems="center" flexDirection="column" w="100%" {...rest}>
      <Flex align="center" w="100%" px="15px" py="10px">
        <Text
          me="auto"
          color={textColor}
          fontSize="xl"
          fontWeight="700"
          lineHeight="100%"
        >
          Consumption per Day
        </Text>
        <Button
          alignItems="center"
          justifyContent="center"
          bg={bgButton}
          _hover={bgHover}
          _focus={bgFocus}
          _active={bgFocus}
          w="37px"
          h="37px"
          lineHeight="100%"
          borderRadius="10px"
          {...rest}
        >
          <Icon as={MdPieChart} color={iconColor} w="20px" h="20px" />
        </Button>
      </Flex>

      <Box h="240px" mt="auto" w="100%">
        <BarChart
          chartData={barChartDataConsumption}
          chartOptions={newOptions}
        />
      </Box>
    </Card>
  );
}