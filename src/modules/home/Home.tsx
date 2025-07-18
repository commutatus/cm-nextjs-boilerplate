import RootLayout from "@/common/layouts/root-layout";
import { Button, Alert, Typography, List } from "antd";
import Link from "next/link";

const { Paragraph, Text, Title } = Typography;

const Home = () => {
  return (
    <RootLayout>
      <div className="flex items-center justify-center flex-col h-auto min-h-[60vh] gap-4 px-4 py-10">
        <h1 className="text-center text-2xl font-bold">Project Starter Kit</h1>

        <Link href="/items">
          <Button type="primary">Explore Items Page</Button>
        </Link>

        <div className="max-w-2xl mt-6 w-full">
          <Alert
            message="Development Guide"
            description={
              <Typography>
                <Title level={5} style={{ marginTop: 0 }}>
                  🛠️ Mock Data Implementation
                </Title>
                <Paragraph>
                  This starter kit includes a complete mock data setup using
                  Apollo Client&apos;s <Text code>MockedProvider</Text> for
                  rapid prototyping:
                </Paragraph>
                <ul>
                  <li>
                    Mock data is defined in{" "}
                    <Text code>/common/graphql/mock-data.ts</Text>
                  </li>
                  <li>
                    Fully functional GraphQL queries without a real backend
                  </li>
                  <li>Easy to replace with real API connections when ready</li>
                </ul>

                <Title level={5} style={{ marginTop: 24 }}>
                  � Available Components
                </Title>
                <Paragraph>
                  Pre-built components you can use immediately:
                </Paragraph>
                <List
                  size="small"
                  bordered
                  dataSource={[
                    "Navbar - Responsive navigation header",
                    "Footer - Standard page footer",
                    "RootLayout - Base page layout structure",
                    "Card - Reusable card component",
                    "Card List Layout - Grid-based listing template",
                    "Items Module - Complete CRUD interface with search and pagination",
                  ]}
                  renderItem={(item) => <List.Item>{item}</List.Item>}
                  style={{ marginTop: 8 }}
                />

                <Title level={5} style={{ marginTop: 24 }}>
                  📦 Items Module Features
                </Title>
                <Paragraph>
                  The pre-configured items page serves as a template for:
                </Paragraph>
                <ul>
                  <li>Product/item listings</li>
                  <li>Search and filtering interfaces</li>
                  <li>Data tables with pagination</li>
                  <li>CRUD operation prototypes</li>
                </ul>
                <Paragraph>
                  <Text strong>Tip:</Text> Rename the route from{" "}
                  <Text code>/items</Text> to match your project (e.g.,{" "}
                  <Text code>/products</Text>, <Text code>/inventory</Text>).
                </Paragraph>
              </Typography>
            }
            type="info"
            showIcon
          />
        </div>
      </div>
    </RootLayout>
  );
};

export default Home;
